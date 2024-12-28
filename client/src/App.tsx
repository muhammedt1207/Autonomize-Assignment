import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { store } from './redux/store';
import { SearchPage } from './Pages/SearchPage';
import { UserProfile } from './Pages/UseProfile';
import RepositoryDetails  from './Pages/RepositoryDetails';
import  FollowList  from './Pages/FollowList';
import './App.css'
const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/user/:username/repo/:repoName" element={<RepositoryDetails />} />
            <Route path="/user/:username/:type" element={<FollowList />} />
          </Routes>
      </Router>
    </Provider>
  );
};

export default App;