import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUser, } from '../redux/actions/UserActions';
import { fetchRepositories } from '../redux/actions/RepoActions';
import { Repository } from '../Types';
import '../style/UserProfile.css';

export const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data: user, loading: userLoading, error: userError } = useSelector(
    (state: RootState) => state.user
  );
  const { data: repos, loading: reposLoading, error: reposError } = useSelector(
    (state: RootState) => state.repositories
  );

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [blog, setBlog] = useState('');

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
      dispatch(fetchRepositories(username));
    }
  }, [username, dispatch]);

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setBlog(user.blog || '');
    }
  }, [user]);

  const handleSave = () => {
    if (username) {
    //   dispatch(updateUserProfile({ username, bio, blog }));
    //   setIsEditing(false);
    }
  };

  if (userLoading || reposLoading) return <div>Loading...</div>;
  if (userError || reposError) return <div>Error loading data</div>;
  if (!user) return null;

  return (
    <div className="user-profile">
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

      <main className="repository-list">
        {repos.map((repo: Repository) => (
          <Link
            key={repo.id}
            to={`/user/${username}/repo/${repo.name}`}
            className="repository-item"
          >
            <div className="repo-header">
              <h3>{repo.name}</h3>
            </div>
            <p>{repo.description}</p>
          </Link>
        ))}
      </main>
    </div>
  );
};
