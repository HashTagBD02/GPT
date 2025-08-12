import React from 'react';
import { Container, Typography } from '@mui/material';

const Tasks: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Tasks Component</Typography>
      <Typography>Available tasks will be displayed here</Typography>
    </Container>
  );
};

export default Tasks;