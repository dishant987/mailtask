import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/verifymail`, { token: token });
      setVerified(true);
      if (res.status === 200 && res.data.message === "Email verified successfully") {
        toast.success(res.data.message);
      }
      if (res.status === 200 && res.data.message === "Email is already verifyed") {
        toast.success(res.data.message);
      }
      console.log(res);
    } catch (error) {
      setError(true);
      console.log(error);
      if (error.response.status === 400 && error.response.data.error === "Invalid token") {
        return toast.error(error.response.data.error);
      }
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken) {
      navigate('/login');
    }
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', py: 2 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Verify Email
      </Typography>
      <Typography variant="h6" sx={{ p: 2, backgroundColor: 'orange', color: 'black', borderRadius: 1 }}>
        {token ? `${token}` : "No token"}
      </Typography>
      {verified && (
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>
            Email Verified
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
            >
              Login
            </Button>
          </Link>
        </Box>
      )}
      {error && (
        <Box mt={2}>
          <Typography variant="h5" sx={{ backgroundColor: 'red', color: 'black', borderRadius: 1, p: 1 }}>
            Error
          </Typography>
        </Box>
      )}
    </Container>
  );
}
