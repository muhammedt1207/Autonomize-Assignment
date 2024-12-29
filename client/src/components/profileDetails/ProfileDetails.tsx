import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileDetails.css';
import { fetchUser } from '../../redux/actions/UserActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { endpoint } from '../../config/EndPoints';
import { toast } from 'sonner';

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
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setBlog(user.blog || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`${endpoint}/${username}`, { bio, blog });
      console.log('Profile updated successfully:', response.data);
      setIsEditing(false);
      setError(null);
      toast.success('Edit Success')
      dispatch(fetchUser(username))
    } catch (error: any) {
      toast.error('Failed to update profile')
      console.error('Failed to update profile:', error.message);
      setError('Failed to save changes. Please try again.');
    }
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
      {error && <p className="error">{error}</p>}
    </aside>
  );
};
