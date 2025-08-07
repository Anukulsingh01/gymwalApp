import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Correct import
import { Stack, Button, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const response = await fetch(`https://exercisedb.p.rapidapi.com/image?resolution=180&exerciseId=${exercise.id}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':import.meta.env.VITE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });

        const blob = await response.blob();
        const imageObjectUrl = URL.createObjectURL(blob);
        setGifUrl(imageObjectUrl);
      } catch (error) {
        console.error('Failed to load GIF:', error);
      }
    };

    fetchGif();
  }, [exercise.id]);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      {gifUrl && <img src={gifUrl} alt={exercise.name} loading="lazy" />}
      <Stack direction="row">
        <Button sx={{
          ml: '21px', color: '#fff', background: '#ffa9a9',
          fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
        }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{
          ml: '21px', color: '#fff', background: '#fcc757',
          fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize'
        }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform="capitalize" fontSize="24px">
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
