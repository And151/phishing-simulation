import {useState, useEffect} from 'react';
import * as React from 'react';
import {TextField, Button, Typography, Paper} from '@mui/material';
import './Attempts.css';
import Navbar from '../Navbar/Navbar'
import axios from '../../utils/axiosConfig';

export interface IAttempt {
    _id: number;
    email: string;
    content: string;
    status: string;
}

const Attempts = () => {
    const [email, setEmail] = useState('');
    const [attempts, setAttempts] = useState<IAttempt[]>([]);

    useEffect(() => {
        fetchAttempts();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post('/phishing/send', {
                email
            });

            if (response.data.success) {
                setAttempts([response.data.attempt, ...attempts]);
                setEmail('');
            }
        } catch (error) {
            console.error('There was an error logging the user:', error);
        }
    };

    const fetchAttempts = async () => {
        try {
            const response = await axios.get('/phishing/all');
            if (response.data?.length) {
                setAttempts([...attempts, ...response.data]);
                setEmail('');
            }
        } catch (error) {
            console.error('There was an error logging the user:', error);
        }
    };

    return (
        <div className="attempts">
            <Navbar/>
            <div className="page-container">
                <div className="form-section">
                    <Paper elevation={3} className="form-container">
                        <Typography variant="h5" className="section-title">
                            Send Phishing Attempt
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Recipient Email"
                                variant="outlined"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                            <Button variant="contained" color="secondary" type="submit" className="submit-btn">
                                Send
                            </Button>
                        </form>
                    </Paper>
                </div>
                <div className="table-section">
                    <Paper elevation={3} className="table-container">
                        <Typography variant="h5" className="section-title">
                            Phishing Attempts Table
                        </Typography>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Recipient Email</th>
                                <th>Content</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attempts.map((row) => (
                                <tr key={row._id}>
                                    <td>{row.email}</td>
                                    <td>{row.content}</td>
                                    <td>{row.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Attempts;
