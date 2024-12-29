import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Repository } from '../../Types';
import './Repos.css';

interface RepositoryListProps {
  repositories: Repository[];
  username: string;
}

export const Repos: React.FC<RepositoryListProps> = ({ repositories, username }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSortChange = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedRepos = [...repositories].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <main className="repository-container">
      <div className="repository-header">
        <h2>Repositories</h2>
        <button onClick={handleSortChange} className="sort-button">
          Sort by date {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className="repository-list">
        {sortedRepos.map((repo: Repository) => (
          <Link
            key={repo.id}
            to={`/user/${username}/repo/${repo.name}`}
            className="repository-item"
          >
            <div className="repo-header">
              <h3>{repo.name}</h3>
              <span className="repo-date">
                {new Date(repo.created_at).toLocaleDateString()}
              </span>
            </div>
            <p>{repo.description || "No description provided."}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};