// src/pages/MovieList.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const res = await API.get('/movies');
    setMovies(res.data);
  };

  const deleteMovie = async (id) => {
    await API.delete(`/movies/${id}`);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>My Movies</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/movies/add')}>Add Movie</Button>
      <List>
        {movies.map((movie) => (
          <ListItem key={movie.id} secondaryAction={
            <>
              <Button onClick={() => navigate(`/movies/edit/${movie.id}`)}>Edit</Button>
              <Button color="error" onClick={() => deleteMovie(movie.id)}>Delete</Button>
            </>
          }>
            <ListItemText primary={movie.title} secondary={`${movie.director} (${movie.year})`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
