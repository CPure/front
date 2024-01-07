import React, { useState } from 'react';
import './App.css';

function App() {
  const [commits, setCommits] = useState([]);
  const filterCommits = (option) => {
    fetch(`http://localhost:3100/api/github?name=${option}`)
      .then(response => response.json())
      .then(data => {
        setCommits(data);
      })
      .catch(error => console.error(`Error fetching ${option} commits:`, error));
  };

  return (
    <div className="App">
      <h1>GitHub Commits</h1>
      <div className="center-container">
        <div className="button-container">
          <button onClick={() => filterCommits('front')}>Frontend</button>
          <button onClick={() => filterCommits('FullTimeForce')}>Backend</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Commit Message</th>
              </tr>
            </thead>
            <tbody>
              {commits.map(commit => (
                <tr key={commit.sha}>
                  <td>{commit.commit.author.name}</td>
                  <td>
                    <strong>
                      <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                        {commit.commit.message}
                      </a>
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
