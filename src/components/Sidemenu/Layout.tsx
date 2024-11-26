import React, { ReactNode, useState, useEffect } from 'react';
import YourAppNavbar from './YourAppNavbar';
import Sidebar from './Sidebar';
import Footerpage from './Footer';
import { useRouter } from 'next/navigation';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const { push } = useRouter();

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const value = localStorage.getItem('username');
    if (value === null) {
      push('/');
    } else {
      setStoredValue(value);
     
    }
    

    const fetchData = async () => {
      try {
        const value = localStorage.getItem('usertype');
        setStoredValue(value);
      } catch (error) {
        console.error('Error fetching usertype:', error);
      }
    };

    fetchData();

    const tokenExpiry = localStorage.getItem('expiresIn');
    if (tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry, 10);
      const currentTime = new Date().getTime();
      const timeLeft = expiryTime - currentTime;

      if (timeLeft > 0) {
        const alertTime = timeLeft - 60000; // 1 minute before expiry

        if (alertTime > 0) {
          setTimeout(() => {
            alert('Your session will expire in 1 minute. Please save your work.');
          }, alertTime);
        }
      } else {
        localStorage.clear();
        push('/');
      }
    }
  }, [push]);

  if (typeof window !== 'undefined' && window.location.pathname === '/SiginPage') {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <YourAppNavbar onMenuButtonClick={handleSidebarToggle} />
        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
          {storedValue !== 'student' ? (
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
          ) : null}
          <div
            style={{
              flex: 1,
              marginLeft: isSidebarOpen ? 80 : 0,
              transition: 'margin 0.3s',
              paddingTop: '80px',
              paddingRight: '40px',
              paddingLeft: '40px',
            }}
          >
            {children}
          </div>
        </div>
        <Footerpage />
      </div>
    </>
  );
};

export default Layout;
