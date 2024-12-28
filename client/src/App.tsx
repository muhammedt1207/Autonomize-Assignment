import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { store } from './redux/store';
import { SearchPage } from './Pages/SearchPage';
import { UserProfile } from './Pages/UseProfile';
import RepositoryDetails  from './Pages/RepositoryDetails';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          {/* <nav>
            <Link to="/">Home</Link>
          </nav> */}
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/user/:username/repo/:repoName" element={<RepositoryDetails />} />
            {/* <Route path="/user/:username/followers" element={<FollowersList />} /> */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;