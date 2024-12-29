import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDetails.css';

interface UserProfileDetailsProps {
  user: {
    avatar_url: string;
    name?: string;
    login: string;
    bio?: string;
    blog?: string;
    followers: number;
    following: number;
  };
  username: string;
}

export const ProfileDetails: React.FC<UserProfileDetailsProps> = ({ user, username }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [blog, setBlog] = useState('');

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setBlog(user.blog || '');
    }
  }, [user]);

  const handleSave = () => {
    // Implement save functionality
    setIsEditing(false);
  };

  return (
    <aside className="sidebar">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <h2>{user.name || user.login}</h2>
      {isEditing ? (
        <>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Edit your bio"
            className="edit-bio"
          />
          <input
            type="text"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            placeholder="Edit your blog URL"
            className="edit-blog"
          />
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </>
      ) : (
        <>
          <p>{user.bio}</p>
          {user.blog && (
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="blog">
              {user.blog}
            </a>
          )}
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
        </>
      )}
      <div className="stats">
        <button onClick={() => navigate(`/user/${username}/followers`)}>
          Followers: {user.followers}
        </button>
        <button onClick={() => navigate(`/user/${username}/following`)}>
          Following: {user.following}
        </button>
      </div>
    </aside>
  );
};