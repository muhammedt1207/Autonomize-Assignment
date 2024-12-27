import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GitHubUser, Repository } from "../Types";

export const UserProfile = () => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const { username } = useParams();
    const navigate = useNavigate();
  
  
  
    if (!user) return <div>Loading...</div>;
  
    return (
      <div className="user-profile">
        <div className="user-info">
          <img src={user.avatar_url} alt={user.login} className="avatar" />
          <h2>{user.login}</h2>
          <p>{user.bio}</p>
          <div className="stats">
            <span>Repos: {user.public_repos}</span>
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
          <button onClick={() => navigate(`/user/${username}/followers`)}>
            View Followers
          </button>
        </div>
  
        <div className="repository-list">
          {repos.map(repo => (
            <Link 
              key={repo.id}
              to={`/user/${username}/repo/${repo.name}`}
              className="repository-item"
            >
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  };