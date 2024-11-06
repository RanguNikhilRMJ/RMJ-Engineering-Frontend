import { createContext, useContext, useState,useEffect } from 'react';

type AuthContextType = {
  token: string | null;
  username: string | null;
  userType: string | null;
  expiresIn: number | null;
  login: (token: string, username: string, userType: string, expiresIn: number) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  userType: null,
  expiresIn: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const login = (token: string, username: string, userType: string, expiresIn: number) => {
    setToken(token);
    setUsername(username);
    setUserType(userType);
    setExpiresIn(expiresIn);

    // Store token and expiresIn in localStorage if needed
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toString());

    // Set timeout to automatically logout when token expires
    setTimeout(() => logout(), expiresIn * 1000); // expiresIn is in seconds, convert to milliseconds
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserType(null);
    setExpiresIn(null);

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  };

  // Check if token has expired on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiresIn = localStorage.getItem('expiresIn');

    if (storedToken && storedExpiresIn) {
      const expiresIn = parseInt(storedExpiresIn, 10);
      const now = Date.now() / 1000; // current time in seconds
      const tokenExpiration = expiresIn + now;

      if (tokenExpiration > now) {
        setToken(storedToken);
        setExpiresIn(expiresIn);

        // Set timeout to automatically logout when token expires
        setTimeout(() => logout(), expiresIn * 1000); // expiresIn is in seconds, convert to milliseconds
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, userType, expiresIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);