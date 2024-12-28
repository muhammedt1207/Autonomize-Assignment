import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Repository } from '../Types';

const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const navigate = useNavigate();
  
  // Inline selector to find repository by name
  const repo = useSelector((state: RootState): Repository | undefined => 
    state.repositories.data.find((repo:Repository) => repo.name === repoName)
  );

  if (!repo) {
    return (
      <div className="repository-details">
        <p>Repository not found</p>
        <button 
          onClick={() => navigate(`/user/${username}`)}
          className="back-button"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="repository-details">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <div className="repository-info">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </div>
      <button 
        onClick={() => navigate(`/user/${username}`)}
        className="back-button"
      >
        Back to Profile
      </button>
    </div>
  );
};

export default RepositoryDetails;