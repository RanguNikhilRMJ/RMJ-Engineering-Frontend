

"use client"
import React from 'react'
import { Card, CardContent, Typography, Avatar, Grid,AvatarGroup } from '@mui/material';
import Image from 'next/image'
import { Box } from '@mui/material';
import { Translate } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Link from 'next/link'

const StatCard: React.FC<{ title: string; count: number; delta: string; imageSrc: string; trendColor: string; avatars: string[] }> = ({ title, count, delta, imageSrc, trendColor, avatars }) => (
    <Card sx={{ width: '100%', borderRadius: '16px', position: 'relative' }}>
    <CardContent sx={{ position: 'relative', zIndex: 1 }}> {/* Added zIndex to keep content above the background image */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Avatar src={imageSrc} sx={{ width: 60, height: 60 }} />
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <Typography variant="body1" color="textSecondary">{delta}</Typography>
        </Grid>
      </Grid>
      <br />
      
      <Grid container spacing={1} sx={{ marginTop: 2 }}>
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="http://production.msmfclasses.com:3006/_next/image?url=%2Fhome%2Fkarunaker.jpg&w=1920&q=75" />
          <Avatar alt="Travis Howard" src="https://media.licdn.com/dms/image/v2/D5603AQHO7iy0Rm4t9A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1682651782269?e=1732147200&v=beta&t=kgxPocu5RxC4CTIyjL70OXDbttB0RNc_xfN3bOZAzq0" />
          <Avatar alt="Cindy Baker" src="http://production.msmfclasses.com:3006/_next/image?url=%2Fhome%2Fhamenth.jpg&w=1920&q=75" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
        <Link href="/chairmanDashbord/temp">        
        <Button variant="text" >View All</Button>
        </Link>

      </Grid>
    </CardContent>
    <Box
      sx={{
        position: 'absolute',
        bottom: 0, // Ensures the image starts from the bottom
        left: 0,
        width: '50%',
        height: '100%', // Adjust height as per requirement
        overflow: 'hidden',
        transform: 'translate(100%, 30%)', // Corrected the transform property

      }}
    >
      <Image
        src="/tl.webp"
        alt="Wave Image"
        fill
        style={{
          objectFit: 'cover', // Ensures the image scales properly
        //   transform: 'rotate(10deg)', // Tilt the image
        }}
      />
    </Box>
  </Card>
)

export default StatCard