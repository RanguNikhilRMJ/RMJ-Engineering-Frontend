
// 'use client';
// import '../app/globals.css';
// import { Footer } from 'flowbite-react';
// import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

// const Footerpage = () => {
//   return (
//     <Footer bgDark>
//       <div className="w-full">
//          <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
//           <Footer.Copyright href="#" by=" RMJ IT SOLUTIONS PVT" year={2022} />
//           <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
//             <Footer.Icon href="#" icon={BsFacebook} />
//             <Footer.Icon href="#" icon={BsInstagram} />
//             <Footer.Icon href="#" icon={BsTwitter} />
//             <Footer.Icon href="#" icon={BsGithub} />
//             <Footer.Icon href="#" icon={BsDribbble} />
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// }

// export default Footerpage;

import React from 'react';
import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter, GitHub, LinkedIn } from '@mui/icons-material';

const Footerpage = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#374151" }}>
      <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" style={{ color: "gray" }}>
                &copy; RMJ IT SOLUTIONS PVT {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <IconButton href="#" style={{ color: "gray" }}>
                  <Facebook />
                </IconButton>
                <IconButton href="#" style={{ color: "gray" }} color="inherit">
                  <Instagram />
                </IconButton>
                <IconButton href="#" style={{ color: "gray" }} color="inherit">
                  <Twitter />
                </IconButton>
                <IconButton href="#" style={{ color: "gray" }} color="inherit">
                  <GitHub />
                </IconButton>
                <IconButton href="#" style={{ color: "gray" }} color="inherit">
                  <LinkedIn />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
    </AppBar>
    
  );
};

export default Footerpage;