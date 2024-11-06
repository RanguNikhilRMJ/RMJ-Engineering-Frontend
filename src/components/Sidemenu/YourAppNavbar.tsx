// components/YourAppNavbar.tsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Badge, Popover, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import { fetchCardDetailstoken } from '@/modules/apitoken';

interface Booking {
    booking_id: string;
    booked_date: string;
    booked_time: string;
    booked_for: string;
    booked_user: string;
    datetime: string;
}

const YourAppNavbar: React.FC<{ onMenuButtonClick: () => void }> = ({ onMenuButtonClick }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [notificationsCount, setNotificationsCount] = useState<number>(0);
    const [notificationsList, setNotificationsList] = useState<Booking[]>([]);
    // const [storedValue, setStoredValue] = useState<string | null>(null);

    const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const token = localStorage.getItem('token') || undefined;
        //         const value = localStorage.getItem('username');
        //         const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
        //         const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
        //         const filteredData2 = fetchedData.filter((data: any) => {
        //             return data.employeid === value;
        //         });
        //         if (filteredData2.length > 0) {
        //             const staffname = filteredData2[0].employeename;
        //             setStoredValue(staffname);
        //         } else {
        //             console.error("No matching staff found.");
        //             setStoredValue(null); // or handle accordingly
        //         }
        //     } catch (error) {
        //         console.error('Error fetching notifications:', error);
        //     }
        // };
        // fetchData();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" style={{ backgroundColor: '#374151', zIndex: 1000 }} elevation={0} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onMouseOver={onMenuButtonClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, textAlign: 'center', paddingRight: '60px' }}>
                        {/* NextGen Digital Campus ({storedValue}) */}
                        Engineering Module
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleNotificationsClick}>
                            <Badge badgeContent={notificationsCount} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/* Notifications Popover */}
                        <Popover
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleNotificationsClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <List>
                                {notificationsList.map((notification, index) => (
                                    <ListItem button key={index}>
                                        <ListItemText
                                            primary={`Booking ID: ${notification.booking_id}, Booking For: ${notification.booked_for}`}
                                            secondary={`Booked Date: ${notification.booked_date}, Time: ${notification.booked_time}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Popover>
                        <IconButton onClick={handleLogout} color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default YourAppNavbar;
