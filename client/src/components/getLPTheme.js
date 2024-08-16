// getLPTheme.js
const getLPTheme = (mode) => ({
    palette: {
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff',
        paper: mode === 'dark' ? '#424242' : '#f5f5f5',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
          
            color: mode === 'dark' ? '#ffffff' : undefined,
            '& .MuiInput-input': {
              color: mode === 'dark' ? '#ffffff' : undefined,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderColor: mode === 'dark' ? '#ffffff' : undefined,
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? '#ffffff' : undefined,
            },
            '&.Mui-focused fieldset': {
              borderColor: mode === 'dark' ? '#ffffff' : undefined,
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : undefined,
            '&.Mui-focused': {
              color: mode === 'dark' ? '#ffffff' : undefined,
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : undefined,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#000000' : undefined,
            color: mode === 'dark' ? '#ffffff' : undefined,
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#333333' : undefined,
            },
          },
        },
      },
    },
  });
  
  export default getLPTheme;
  