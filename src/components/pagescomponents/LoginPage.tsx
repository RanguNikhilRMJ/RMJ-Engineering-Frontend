"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchCardDetails } from '@/modules/api';
import { DIGITAL_CAMPUS_BASE_URL} from '@/modules/apiConfig';
import Image from 'next/image';
import {AlertColor} from '@mui/material';
import CustomSnackbar from '../CustomSnackbar';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { push } = useRouter();
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const requestData = {
            username: username, 
            password: password,
          };
          
      const url = `${DIGITAL_CAMPUS_BASE_URL}/auth/login`;
      const details = await fetchCardDetails(url, 'POST',requestData);
      setErrorMessage('');
      if (details) {
        const expiryTime = new Date().getTime() + details.expiresIn;
        localStorage.setItem('username', username);
        localStorage.setItem('token', details.token);
        localStorage.setItem('usertype', details.usertype);
        localStorage.setItem('expiresIn', expiryTime.toString());
        localStorage.setItem('expiresIn1', details.expiresIn);
        push(`/Dashboard`);
        // if (filteredData1.length > 0) {
        
        //   if (filteredData1[0].login_usertype === 'Admin') {
        //     push(`/Admin/editMentors`);
        //   } else {
        //     push(`/allMentors/`);
        //   }
        // } else {
        //   setErrorMessage('Authentication failed. Username or password is wrong.');
        // }
      } else {
        setErrorMessage('Authentication failed. Username or password is wrong.');
      }
    } catch (error: any) {
        setMessage(error.message);
        setSnackbarOpen(true);
        setSeverity('error');
        setTimeout(() => {
          setSnackbarOpen(false);
          setMessage(null);
        }, 10000); 
      setErrorMessage( error.message|| 'An error occurred');
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };
  return (
    <>
     <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Grid container>
        <Grid item xs={6} md={5.5} sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* Left Grid (visible on larger screens) */}
          <Box sx={{ backgroundColor: '#0b5cff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: 'auto', marginTop: '5x' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h2" gutterBottom sx={{ marginBottom: 'auto', color: 'white', fontWeight: 'bold', display: 'block' }}> Welcome</Typography>
              </div>
              <Typography variant="h4" gutterBottom sx={{ marginBottom: 'auto', color: '#b8b8b8', display: 'block' }}> Engineering Portal </Typography>
            </div>
            <div style={{ width: '30%', position: 'absolute', marginLeft: '27%' }}>
             
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={6.5}>
          {/* Right Grid (visible on all screens) */}
          <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '80%' }}>
                  <Typography variant="h2" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}> Login</Typography>
                  <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input
                      id='username'
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='username'
                      style={{ border: '1px solid black', padding: '20px', width: '100%', boxSizing: 'border-box', marginBottom: '8px', borderRadius: '20px' }}
                    />

                    <input
                      id='password'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='password'
                      style={{ border: '1px solid black', padding: '20px', width: '100%', boxSizing: 'border-box', marginBottom: '8px', borderRadius: '20px' }}
                    />

                    <button
                      type="submit"
                      style={{ border: '1px solid black', padding: '20px', width: '100%', boxSizing: 'border-box', marginBottom: '8px', backgroundColor: '#0b5cff', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
                    >
                      Login
                    </button>
                  </form>
                  <Typography variant="body2" gutterBottom sx={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                  </Typography>
                  <br />
                </Box>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage;