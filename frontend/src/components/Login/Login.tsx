import * as React from 'react';
import {useState} from 'react';
import {TextField, Button, Typography, Paper, Box, Grid, CircularProgress} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import './Login.css';
import {setToken} from '../../utils/jwt-utils';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });

            if (response.data.success) {
                const {access_token} = response.data;
                setToken(access_token);
                navigate('/attempts');
            } else {
                setErrorMessage(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('There was an error logging the user:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={6} className="login-paper">
                        <Box p={4}>
                            <Typography variant="h5" align="center" gutterBottom>
                                Login
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    label="Username"
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
                                    style={{marginTop: '20px'}}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit"/> : 'Login'}
                                </Button>
                            </form>

                            {/* Error Message */}
                            {errorMessage && (
                                <Typography color="error" variant="body2" align="center" style={{marginTop: '10px'}}>
                                    {errorMessage}
                                </Typography>
                            )}

                            <Box mt={2} textAlign="center">
                                <Typography variant="body2">
                                    Don't have an account? <a href="/register">Register</a>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
