import React, { useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Home from './components/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerifyEmail from './components/VerifyEmail';
import UserProfile from './components/UserProfile';

const App = () => {
  
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home />,
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
      path: "/logout",
      element: <UserProfile/>,
    },
    {
      path: "/verifyemail",
      // element: <ProtectedRoute component={ResentEmail} />,
      element: <VerifyEmail />,
    },

  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      {/* <Home toggleColorMode={toggleColorMode} /> */}
    </ThemeProvider>
  )
}

export default App