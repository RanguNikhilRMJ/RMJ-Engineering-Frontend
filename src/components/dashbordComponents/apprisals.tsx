import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  // backgroundColor: theme.palette.background.paper,
  // boxShadow: theme.shadows[3],
}));

function AppraisalGrid() {
  return (
    <Grid container spacing={1} style={{ padding: 16 }}>
      <Grid item xs={12} sm={6}>
        <div>
            <Item>
            <Typography variant="h5" gutterBottom color="green" sx={{ fontWeight: 'bold'}} >
            <span style={{ background: 'linear-gradient(to right, #a30ded, #feb47b)',backgroundClip:'text',color: 'transparent'}}>Appraisal✨</span>

            </Typography>
            <Typography variant="body2">
            View your performance review and feedback.


          </Typography>
            </Item>
        </div>
    
      </Grid>
      <Grid item xs={12} sm={6}>
        <Item>
          <Typography variant="h6" gutterBottom  color="black" >
            Overall Rating
          </Typography>
          <Typography variant="h4" color="green">
            4.8/5
          </Typography>
        </Item>
      </Grid>
      <Grid item xs={12} sm={12}>
      <Item sx={{display:"flex",flexDirection:"column",alignItems:"start"}}>
      <Typography variant="h6" gutterBottom  color="black" >
         Areas for Improvement
          </Typography>
          <Typography variant="body2">
            - Provide more hands-on activities
            <br />
            - Improve communication with students
          </Typography>
        </Item>
      </Grid>
 
    </Grid>
  );
}

export default AppraisalGrid;
