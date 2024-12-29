import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/users'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">GitHub Profile</h1>
        <button className="navbar-button" onClick={handleRedirect}>
          View All Users
        </button>
      </div>
    </nav>
  );
};
