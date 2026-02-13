import { createTheme } from '@mui/material/styles'

// M3-inspired tokens: warm valentine palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000',
    },
    secondary: {
      main: '#ad1457',
      light: '#e35183',
      dark: '#78002e',
    },
    background: {
      default: '#fce4ec',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        },
      },
    },
  },
})

export default theme
