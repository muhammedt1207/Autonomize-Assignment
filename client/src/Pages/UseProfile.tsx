import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUser } from '../redux/actions/UserActions';
import { fetchRepositories } from '../redux/actions/RepoActions';
import { Repository } from '../Types';
import '../style/UserProfile.css'
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

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
      dispatch(fetchRepositories(username));
    }
  }, [username, dispatch]);

  if (userLoading || reposLoading) return <div>Loading...</div>;
  if (userError || reposError) return <div>Error loading data</div>;
  if (!user) return null;

  return (
    <div className="user-profile">
      <aside className="sidebar">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <h2>{user.name || user.login}</h2>
        <p>{user.bio}</p>
        {user.blog && (
          <a href={user.blog} target="_blank" rel="noopener noreferrer" className="blog">
            {user.blog}
          </a>
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
