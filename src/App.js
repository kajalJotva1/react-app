
import React from 'react'; // Import useEffect from React

import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail/PostDetail'


function App() {
  return (
    <Router>
      <div className="container">
          <header className="my-4">
            <h1 className="text-center header-text">Post Management</h1>  
          </header>
        <Routes>
        <Route path="/" element={<Navigate to="/posts" replace/>} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
