import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Repository } from '../../Types';
import './RepoDetails.css'
const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const navigate = useNavigate();

  const repo = useSelector((state: RootState): Repository | undefined => 
    state.repositories.data.find((repo: Repository) => repo.name === repoName)
  );

  const handleCloneButtonClick = () => {
    if (repo?.clone_url) {
      navigator.clipboard.writeText(repo.clone_url);
      alert('Git clone URL copied to clipboard!');
    }
  };

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
      
      <p><strong>Description:</strong> {repo.description || 'No description available'}</p>
      <p><strong>Language:</strong> {repo.language || 'Not specified'}</p>
      <p><strong>Size:</strong> {repo.size ? `${repo.size} KB` : 'Not specified'}</p>
      <p><strong>Subscribers Count:</strong> {repo.subscribers_count || 'Not available'}</p>
      <p><strong>Forks Count:</strong> {repo.forks_count || 'Not available'}</p>

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
    <div className='buttons'>

      <button 
        onClick={handleCloneButtonClick}
        className="clone-button"
      >
        Git Clone 
      </button>

      <button 
        onClick={() => navigate(`/user/${username}`)}
        className="back-button"
      >
        Back to Profile
      </button>
    </div>
    </div>
  );
};

export default RepositoryDetails;
