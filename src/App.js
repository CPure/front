import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3100/api/github')
      .then(response => response.json())
      .then(data => setCommits(data))
      .catch(error => console.error('Error fetching commits:', error));
  }, []);

  return (
    <div className="App">
      <h1>Lista de Commits de GitHub</h1>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha}>
            {commit.commit.author.name} <span> : </span>
          <strong>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
              {commit.commit.message}
            </a>
          </strong>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;