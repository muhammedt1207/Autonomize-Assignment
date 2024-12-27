import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Repository } from "../Types";

const RepositoryDetails = () => {
    const { username, repoName } = useParams();
    const [repo, setRepo] = useState<Repository | null>(null);
  

  
    if (!repo) return <div>Loading...</div>;
  
    return (
      <div className="repository-details">
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    );
  };