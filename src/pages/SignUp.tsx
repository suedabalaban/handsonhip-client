import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import ToggleColorMode from 'src/components/ToggleColorMode';
import getSignUpTheme from 'src/theme/getSignUpTheme';
import { register } from 'src/api/auth';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(4),
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  paddingBottom: theme.spacing(12),
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: 0,
    height: '100vh',
  },
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const theme = createTheme(getSignUpTheme(mode));

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [termsChecked, setTermsChecked] = React.useState(false);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs() || !termsChecked) return;

    const data = new FormData(event.currentTarget);

    const user = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      address: data.get('address') as string,
      country: data.get('country') as string,
      city: data.get('city') as string,
    };

    try {
      await register(user);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            position: { xs: 'static', sm: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Button
            sx={{ display: 'flex', alignItems: 'center' }}
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/"
          >
            Do you have an account? Sign in
          </Button>
          <Box sx={{ position: { xs: 'relative', sm: 'absolute' }, right: 0 ,mr:2}}>
            <ToggleColorMode
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            justifyContent: 'center',
            height: { xs: '100%', sm: '100vh' },
            p: 1,
          }}
        >
          <Card>
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb:0, fontFamily: 'sans-serif', width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="John"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    placeholder="Doe"
                  />
                </FormControl>
              </Stack>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  placeholder="example@example.com"
                  error={emailError}
                  helperText={emailErrorMessage}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  name="password"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  placeholder="••••••"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="address">Address</FormLabel>
                <TextField
                  name="address"
                  fullWidth
                  id="address"
                  placeholder="1234 Main St"
                  autoComplete="street-address"
                />
              </FormControl>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <TextField
                    name="country"
                    fullWidth
                    id="country"
                    placeholder="USA"
                    autoComplete="country-name"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <TextField
                    name="city"
                    fullWidth
                    id="city"
                    placeholder="New York"
                    autoComplete="address-level2"
                  />
                </FormControl>
              </Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    value="agree"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="#" variant="body2">
                      terms and conditions
                    </Link>
                    .
                  </Typography>
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 0 }}
                disabled={!termsChecked}
              >
                Sign Up
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
