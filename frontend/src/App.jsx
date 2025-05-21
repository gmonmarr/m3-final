// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MovieList from './pages/MovieList';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import { useAuth } from './AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!token ? <LoginPage /> : <Navigate to="/movies" />} />
      <Route path="/movies" element={token ? <MovieList /> : <Navigate to="/" />} />
      <Route path="/movies/add" element={token ? <AddMovie /> : <Navigate to="/" />} />
      <Route path="/movies/edit/:id" element={token ? <EditMovie /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
