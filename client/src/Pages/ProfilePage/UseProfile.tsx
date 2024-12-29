import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUser } from '../../redux/actions/UserActions';
import { fetchRepositories } from '../../redux/actions/RepoActions';
import {ProfileDetails}  from '../../components/profileDetails/ProfileDetails';
import { Repos } from '../../components/Repos/Repos';
import './UserProfile.css';

export const UserProfile = () => {
  const { username } = useParams();
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
  if (!user || !username) return null;

  return (
    <div className="user-profile">
      <ProfileDetails user={user} username={username} />
      <Repos repositories={repos || []} username={username} />
    </div>
  );
};