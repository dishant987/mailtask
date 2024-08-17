import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColor';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './Themecontext';


function Navbar() {
  const { mode, toggleColorMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(['accessToken']);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const handleSignOut = async () => {

    try {
      const response = await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
      console.log(response.data)
      if (response.data.statuscode === 200 && response.data.message === "User Logged Out") {
        toast.success(response.data.message);
        removeCookie('accessToken');
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error)
    }

  };

  const isLoggedIn = !!cookies.accessToken;

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={
                  '/1.jpg'
                }

                style={{ marginLeft: "10px", width: "50px", borderRadius: '47%' }}

                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex', gap: 10 } }}>
                <MenuItem
                  onClick={() => scrollToSection('features')}
                  sx={{ py: '6px', px: '12px', borderRadius: 20 }}
                >
                  <Typography variant="body2" color="text.primary">
                    Features
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px', borderRadius: 20 }}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px', borderRadius: 20 }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('pricing')}
                  sx={{ py: '6px', px: '12px', borderRadius: 20 }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px', borderRadius: 20 }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isLoggedIn ? (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleSignOut}
                  sx={{ borderRadius: 15, margin: 1 }}
                >
                  Sign Out
                </Button>
              ) : (
                <>

                  <Button
                    href='/login'

                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 15, margin: 1 }}
                  >
                    Sign In
                  </Button>

                  <Button
                    color="primary"
                    variant="contained"
                    href='/signup'
                    size="small"
                    sx={{ borderRadius: 15, margin: 1 }}
                  >
                    Signup
                  </Button>


                </>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  {isLoggedIn ? (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSignOut}
                        sx={{ width: '100%' }}
                      >
                        Sign Out
                      </Button>
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          component="a"
                          href="/signup"
                          sx={{ width: '100%' }}
                        >
                          Sign Up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          href="/login"
                          sx={{ width: '100%' }}
                        >
                          Sign In
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
