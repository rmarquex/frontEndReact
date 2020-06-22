import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories");

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo repositório ${Date.now()}`,
      url: "https://api.github.com/users/danilo-vieira/repos",
      techs: ["React", "ReactJS", "React Native"],
    };

    const response = await api.post("repositories", repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const newRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(newRepositories);
    } else {
      alert("Não foi possível excluir o repositório");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
