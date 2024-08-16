import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerifyEmail from './components/VerifyEmail';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import getLPTheme from './components/getLPTheme';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ResendVerifyMail from './components/ResendVerifyMail';
import { Toaster } from 'react-hot-toast';
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const App = () => {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);

  const LPtheme = createTheme({
    ...createTheme({ palette: { mode } }),
    ...getLPTheme(mode),
  });

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/verifyemail",
      element: <VerifyEmail />,
    },
    {
      path: "/resendverifyemail",
      element: <ResendVerifyMail />,
    },
  ]);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />

      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{

          style: {
            borderRadius: "20px",

          }
        }}
      />
    </ThemeProvider>
  );
};

export default App;
