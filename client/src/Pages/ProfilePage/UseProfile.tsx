import  { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUser } from '../../redux/actions/UserActions';
import { fetchRepositories } from '../../redux/actions/RepoActions';
import {ProfileDetails}  from '../../components/profileDetails/ProfileDetails';
import { Repos } from '../../components/Repos/Repos';
import './UserProfile.css';
import { toast } from 'sonner';

export const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()
  const { data: user, loading: userLoading, } = useSelector(
    (state: RootState) => state.user
  );
  const { data: repos, loading: reposLoading,  } = useSelector(
    (state: RootState) => state.repositories
  );

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username)).unwrap()
      .then(()=>{
        dispatch(fetchRepositories(username));
      })
      .catch((error) => {
        toast.error(`Error fetching user: ${error.message}`);
        navigate('/');
      });
    }
  }, [username, dispatch]);

  if (userLoading || reposLoading) return <div>Loading...</div>;
  if (!user || !username) return null;

  return (
    <div className="user-profile">
      <ProfileDetails user={user} username={username} />
      <Repos repositories={repos || []} username={username} />
    </div>
  );
};