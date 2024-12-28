// FollowersList.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchFollowers } from '../redux/actions/FollowActions';
import '../style/FollowList.css';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  location?: string;
  bio?: string;
  company?: string;
}

const FollowersList = () => {
  const { username = '', type = '' } = useParams<{ username: string; type: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { data, loading, error } = useSelector((state: RootState) => state.followers);

  useEffect(() => {
    if (username && type) {
      dispatch(fetchFollowers({ username, type }));
    }
  }, [username, type, dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading data</div>;

  return (
    <div className="followers-container">
      <div className="followers-list">
        {data?.map((user: GitHubUser) => (
          <div 
            key={user.id}
            onClick={() => navigate(`/user/${user.login}`)}
            className="follower-card"
          >
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`}
              className="follower-avatar"
            />
            <div className="follower-info">
              <div className="follower-header">
                <h3 className="follower-name">{user.name || user.login}</h3>
                <span className="follower-username">@{user.login}</span>
              </div>
              {user.bio && (
                <p className="follower-bio">{user.bio}</p>
              )}
              <div className="follower-meta">
                {user.company && (
                  <div className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 16 16">
                      <path fill="currentColor" d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5L6.5 1h-4.75z" />
                    </svg>
                    <span>{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 16 16">
                      <path fill="currentColor" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.534a5 5 0 117.072-7.072v0z" />
                    </svg>
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersList;