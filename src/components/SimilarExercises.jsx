import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarExercises = ({ targetMuscleExercises = [], equipmentExercises = [] }) => {
  console.log("Target muscle exercises:", targetMuscleExercises);
  console.log("Equipment exercises:", equipmentExercises);

  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      <Typography variant='h3' mb={5} textAlign="center">
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
        {Array.isArray(targetMuscleExercises) && targetMuscleExercises.length ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </Stack>

      <Typography variant='h3' mb={5} textAlign="center">
        Exercises that use the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
        {Array.isArray(equipmentExercises) && equipmentExercises.length ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
