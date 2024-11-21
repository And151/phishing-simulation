import React from 'react';
import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import './Navbar.css';
import {useNavigate} from "react-router-dom";
import {removeToken} from "../../utils/jwt-utils";

const Navbar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        removeToken();
        navigate('/login');
    }

    return (
        <AppBar position="fixed" className="navbar">
            <Toolbar className="navbar-content">
                <Typography variant="h6" className="navbar-title">
                    Phishing
                </Typography>
                <IconButton edge="end" color="inherit" onClick={onLogout} className="logout-btn">
                    Logout
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
