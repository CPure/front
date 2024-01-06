import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [commits, setCommits] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
 

  const filterCommits = (option) => {

    fetch(`http://localhost:3100/api/github?name=${option}`)
      .then(response => response.json())
      .then(data => {
        setCommits(data);
        setSelectedOption(option);
      })
      .catch(error => console.error(`Error fetching ${option} commits:`, error));
  };
 

  return (
    <div className="App">
      <h1>GitHub Commits</h1>
      <div>
        <button onClick={() => filterCommits('front')}>Commits Frontend</button>
        <button onClick={() => filterCommits('FullTimeForce')}>Commits Backend</button>
      </div>
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
