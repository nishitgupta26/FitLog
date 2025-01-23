import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff', // Entire page background
      paper: '#f5f5f5',   // Component backgrounds
    },
    text: {
      primary: '#000000',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Entire page background
      paper: '#1e1e1e',   // Component backgrounds
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          backgroundColor: '#121212',
          color: '#ffffff',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
});
