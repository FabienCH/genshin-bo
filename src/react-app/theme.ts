import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#181E24',
      default: '#2B343B',
    },
    primary: {
      light: '#5AC1F4',
      main: '#0091C1',
      dark: '#006390',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f8cf9d',
      main: '#cca574',
      dark: '#997648',
      contrastText: '#000',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(216, 224, 230, 1)',
      secondary: 'rgba(216, 224, 230, 1)',
      disabled: 'rgba(216, 224, 230, 0.38)',
      hint: 'rgba(216, 224, 230, 0.38)',
    },
    type: 'dark',
  },
  overrides: {
    MuiContainer: {
      root: {
        backgroundColor: '#181E24',
        padding: '20px',
        '&:not(:last-child)': {
          marginRight: '30px',
        },
      },
    },
  },
});
