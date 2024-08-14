import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ToggleColorMode from 'src/components/ToggleColorMode';
import ForgotPassword from 'src/components/SignIn/ForgotPassword';
import { SitemarkIcon } from 'src/components/SignIn/CustomIcons';
import { login } from 'src/api/auth';
import getSignInSideTheme from 'src/theme/getSignInSideTheme';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://handsonhip.com/">
        Handsonhip
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(3),
  width: '100%',
  padding: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  }),
}));

function SignInCard({ onLoginSuccess }: { onLoginSuccess: (email: string, password: string) => void }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (validateInputs(email, password)) {
      try {
        await login(email, password);
        onLoginSuccess(email, password);  
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  const validateInputs = (email: string, password: string) => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontFamily:'sans-serif', width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' , textAlign: "center"}}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ fontSize: '0.875rem' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </Box>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Link onClick={() => navigate('/signup')} variant="body2" sx={{ alignSelf: 'center' }}>
          Don&apos;t have an account? Sign up
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Card>
  );
}

export default function SignInSide() {
  const [mode, setMode] = React.useState<PaletteMode>(
    localStorage.getItem('themeMode') as PaletteMode || 'light'
  );

  const theme = createTheme(getSignInSideTheme(mode));
  const navigate = useNavigate();

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/');  
    } catch (error) {
      console.error('Login error:', error);  
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        direction="column"
        component="main"
        sx={{
          justifyContent: 'space-between',
          backgroundImage: 'url(/background.jpg)', // Arka plan resmi yolu
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 'auto', md: '100dvh' },
          pb: { xs: 12, sm: 0 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            position: { sm: 'static', md: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ position: { xs: 'relative', md: 'absolute' } }}>
            <ToggleColorMode
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Box>
        </Stack>

        <Stack
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, sm: 6 },
            width: '100%',
            maxWidth: '1400px',
            flexGrow: 1,
            mx: 'auto',
          }}
        >
          <Stack
            direction="column"
            sx={{
              width: { xs: '100%', sm: '50%', md: '35%' },
              height: '100%',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
            }}
          >
          </Stack>
          <SignInCard onLoginSuccess={handleLoginSuccess} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
