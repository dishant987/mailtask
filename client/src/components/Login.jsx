import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorIcon from '@mui/icons-material/Error';

const defaultTheme = createTheme();

const ErrorMessage = ({ children }) => (
    <Typography variant="caption" color="error">
        <ErrorIcon style={{ marginRight: "5px", fontSize: '15px' }} />
        {children}
    </Typography>
);

export default function Login() {



    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate()


    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
  
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Logging In...");
        setLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost/api/users/signin', values);
         
          
          
        } catch (error) {
            console.error(error);
            toast.error("Something wrong, try again later ")
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
    
            <Grid container component="main" sx={{  display:'flex',  justifyContent:'center' , alignItems:'center' }}>
            
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6}  sx={{ borderRadius:4}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        margin="normal"
                                        as={TextField}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? <ErrorMessage children={errors.email} /> : null}
                                    />
                                    <Field
                                        margin="normal"
                                        as={TextField}
                                        fullWidth
                                        name="password"
                                        label="Password"

                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"

                                        error={errors.password && touched.password}
                                        helperText={errors.password && touched.password ? <ErrorMessage children={errors.password} /> : null}

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />


                               


                                    {loading ? (
                                        <LoadingButton fullWidth sx={{ mt: 3, mb: 2 }} loading variant="contained">
                                            Submit
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={loading} // Disable button when loading
                                        >
                                            Sign In
                                        </Button>
                                    )}

                                    <Grid container>
                                        
                                        <Grid item>
                                            <Link to={"/signup"} variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
     
    );
}
