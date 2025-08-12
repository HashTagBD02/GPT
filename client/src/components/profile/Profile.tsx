import React from 'react';
import { Container, Typography } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Profile Component</Typography>
      <Typography>User profile settings will be displayed here</Typography>
    </Container>
  );
};

export default Profile;