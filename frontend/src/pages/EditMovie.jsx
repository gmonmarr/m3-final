// src/pages/EditMovie.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditMovie() {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/movies').then(res => {
      const movie = res.data.find(m => m.id.toString() === id);
      if (movie) {
        setTitle(movie.title);
        setDirector(movie.director);
        setYear(movie.year);
      }
    });
  }, [id]);

  const handleEdit = async () => {
    await API.put(`/movies/${id}`, { title, director, year });
    navigate('/movies');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Edit Movie</Typography>
        <TextField fullWidth label="Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth label="Director" margin="normal" value={director} onChange={(e) => setDirector(e.target.value)} />
        <TextField fullWidth label="Year" margin="normal" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleEdit}>Save</Button>
      </Box>
    </Container>
  );
}
