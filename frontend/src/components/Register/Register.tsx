import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('/auth/signup', {
                username,
                email,
                password,
            });

            if (response.data.success) {
                console.log('Registration successful:', response.data);
                navigate('/login');
            } else {
                setErrorMessage(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('There was an error registering the user:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={6} className="register-paper">
                        <Box p={4}>
                            <Typography variant="h5" align="center" gutterBottom>
                                Create an Account
                            </Typography>
                            <form onSubmit={handleRegister}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    style={{ marginTop: '20px' }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                                </Button>
                            </form>

                            {/* Error Message */}
                            {errorMessage && (
                                <Typography color="error" variant="body2" align="center" style={{ marginTop: '10px' }}>
                                    {errorMessage}
                                </Typography>
                            )}

                            <Box mt={2} textAlign="center">
                                <Typography variant="body2">
                                    Already have an account? <a href="/login">Login</a>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Register;
