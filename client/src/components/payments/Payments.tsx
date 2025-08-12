import React from 'react';
import { Container, Typography } from '@mui/material';

const Payments: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Payments Component</Typography>
      <Typography>Payment methods and withdrawal options will be displayed here</Typography>
    </Container>
  );
};

export default Payments;