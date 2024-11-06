"use client"
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import { Image_BASE_URL } from '@/modules/apiConfig';

interface FacultyDetailsProps {
  mentorName: string;
  designation: string;
}

const FacultyDetails: React.FC<FacultyDetailsProps> = ({ mentorName, designation }) => {
  const [facultyphoto, setfacultyphoto] = useState<string>('');
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const fimgurl = `${Image_BASE_URL}/${username}.jpg`;
    setfacultyphoto(fimgurl);
  }, []);

  const ImageContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '70px',
    height: '70px',
    overflow: 'hidden',
    borderRadius: '50%',
    marginRight: '20px',
    '&:hover img': {
      transform: 'scale(1.5)',
    },
  }));

  const StyledImageWrapper = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
  });

  return (
    <Box>
      <Grid container>
        <Grid item xs={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ImageContainer
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <StyledImageWrapper>
                <Image src={facultyphoto} alt="Faculty Photo" layout="fill" objectFit="cover" />
              </StyledImageWrapper>
            </ImageContainer>
            <div>
              <Typography variant="subtitle1" display="block" sx={{ color: 'black', fontWeight: 'bold' }} gutterBottom>
                {mentorName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                {designation}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacultyDetails;