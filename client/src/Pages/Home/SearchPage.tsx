import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchPage.css'
export const SearchPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (username) {
        navigate(`/user/${username}`);
      }
    };
  
    return (
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
  };