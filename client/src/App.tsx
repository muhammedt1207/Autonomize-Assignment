import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchPage } from "./Pages/Home/SearchPage";
import { UserProfile } from "./Pages/ProfilePage/UseProfile";
import RepositoryDetails from "./Pages/RepoDetails/RepositoryDetails";
import FollowList from "./Pages/FollowList/FollowList";
import "./App.css";
import { Navbar } from "./components/NavBar/Navbar";
import { UsersList } from "./components/usersList/UsersList";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: any) => state.user.data);
  return user ? children : <Navigate to="/user/:username" replace />;
};

const App = () => {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route
          path="/user/:username/repo/:repoName"
          element={
            <PrivateRoute>
              <RepositoryDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:username/:type"
          element={
            <PrivateRoute>
              <FollowList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;