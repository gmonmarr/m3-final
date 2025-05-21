// src/pages/AddMovie.jsx
import React, { useState } from 'react';
import API from '../api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleAdd = async () => {
    await API.post('/movies', { title, director, year });
    navigate('/movies');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Add Movie</Typography>
        <TextField fullWidth label="Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth label="Director" margin="normal" value={director} onChange={(e) => setDirector(e.target.value)} />
        <TextField fullWidth label="Year" margin="normal" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>Add</Button>
      </Box>
    </Container>
  );
}
