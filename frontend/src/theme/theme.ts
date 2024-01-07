import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#1484C2',
          ':hover': {
            backgroundColor: '#04659B',
          },
        },
        outlined: {
          color: '#333333',
          borderColor: '#333333',
          ':hover': {
            borderColor: '#333333',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#333333',
        },
      },
    },
  },
});

export default theme;
