"use client"
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const NotFoundPage: React.FC = () => {

  const { push } = useRouter();
  const goToHome = () => {
   
    push('/Dashboard');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
           <Image
                src="/404.webp"
                width={400}
                    height={400}
                    alt="Picture of the author"
                  />
             
      <Typography variant="h5" mb={4}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" mb={4}>
        The page you are looking for doesn&apos;t exist.
      </Typography>
      <Button variant="outlined" color="primary" onClick={goToHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
