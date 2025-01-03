import React from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../features/auth';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {
  const {user} = useSelector(userSelector);
  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  
return (
  <Box>
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h4'>My Profile</Typography>
      <Button color='inherit' onClick={logout}>
        Logout &nbsp; <ExitToApp />
      </Button>
    </Box>
    {!favoriteMovies.length  
    ? <Typography>Add favorites or watchlist some movies to see them here!</Typography>
    : (<Box> Favorite movies</Box>)
    }
  </Box>
)
}

export default Profile