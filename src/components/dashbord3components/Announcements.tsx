import React from 'react';
import { Box, Typography } from '@mui/material';

interface Announcement {
  category: string;
  description: string;
  timeAgo: string;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

const Announcements: React.FC<AnnouncementsProps> = ({ announcements }) => {
  return (
  <>
      {announcements.map((announcement, index) => (
        <Box 
          key={index} 
          sx={{ 
            marginBottom: 3, 
            padding: 2, 
            backgroundColor: '#f9f9f9', 
            borderRadius: '12px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.08)' 
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            {announcement.category}
          </Typography>
          <Typography variant="body1" component="span" sx={{ marginLeft: 1, color: '#555' }}>
            {announcement.description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', marginTop: '8px' }}>
            {announcement.timeAgo}
          </Typography>
        </Box>
      ))}
</>
  );
};

export default Announcements;
