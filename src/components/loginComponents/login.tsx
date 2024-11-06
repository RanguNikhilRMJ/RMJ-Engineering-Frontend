"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchCardDetails } from '@/modules/api';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import CustomSnackbar from '@/components/CustomSnackbar';
import CircularProgress from '@mui/material/CircularProgress'; // Import the loader

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { push } = useRouter();
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<'error' | 'success'>('error');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when the form is submitted

    try {
      const requestData = {
        username: username,
        password: password,
      };

      const url = `${DIGITAL_CAMPUS_BASE_URL}/auth/login`;
      const details = await fetchCardDetails(url, 'POST', requestData);

      setErrorMessage('');
      if (details) {
        const expiryTime = new Date().getTime() + details.expiresIn;
        localStorage.setItem('username', username);
        localStorage.setItem('token', details.token);
        localStorage.setItem('usertype', details.usertype);
        localStorage.setItem('expiresIn', expiryTime.toString());
        localStorage.setItem('expiresIn1', details.expiresIn);
        push(`/Dashboard`);
      } else {
        setErrorMessage('Authentication failed. Username or password is wrong.');
      }
    } catch (error: any) {
      setMessage(error.message || 'An error occurred');
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '80%' }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'Palatino Gambarino, Palatino Linotype, sans-serif',
              }}
            >
              Login
            </Typography>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={{
                  border: '1px solid black',
                  padding: '20px',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '8px',
                  borderRadius: '20px',
                }}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  border: '1px solid black',
                  padding: '20px',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '8px',
                  borderRadius: '20px',
                }}
              />
              <button
                type="submit"
                style={{
                  border: '1px solid black',
                  padding: '20px',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: '8px',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'} {/* Show loader or 'Login' */}
                </button>
            </form>
            <Typography variant="body2" gutterBottom sx={{ color: 'red', textAlign: 'center' }}>
              {errorMessage}
            </Typography>
            <br />
          </Box>
        </div>
      </div>

      {/* Snackbar for Error Messages */}
      {Message && (
        <CustomSnackbar
          open={isSnackbarOpen}
          onClose={handleCloseSnackbar}
          message={Message}
          severity={severity}
        />
      )}
    </Box>
  );
};

export default LoginPage;
