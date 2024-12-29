import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchFollowers } from '../../redux/actions/FollowActions';
import { ProfileDetails } from '../../components/profileDetails/ProfileDetails';
import './FollowList.css';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  location?: string;
  bio?: string;
  company?: string;
}

const FollowersList: React.FC = () => {
  const { username = '', type = '' } = useParams<{ username: string; type: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { data, loading, error } = useSelector((state: RootState) => state.followers);
  const { data: user, loading: userLoading, error: userError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (username && type) {
      dispatch(fetchFollowers({ username, type }));
    }
  }, [username, type, dispatch]);

  if (loading || userLoading) return <div className="loading">Loading...</div>;
  if (error || userError) return <div className="error">Error loading data</div>;

  return (
    <div className="main-layout">
      <div className="profile-sidebar">
        <ProfileDetails user={user} username={username} />
      </div>
      <div className="content-area">
        <h2 className="content-title">{type === 'followers' ? 'Followers' : 'Following'}</h2>
        <div className="followers-container">
          {data?.map((user: GitHubUser) => (
            <div 
              key={user.id}
              onClick={() => navigate(`/user/${user.login}`)}
              className="follower-card"
            >
              <div className="follower-card-content">
                <img 
                  src={user.avatar_url} 
                  alt={`${user.login}'s avatar`}
                  className="follower-avatar"
                />
                <div className="follower-info">
                  <span className="follower-name">{user.name || user.login}</span>
                  <span className="follower-username">@{user.login}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowersList;