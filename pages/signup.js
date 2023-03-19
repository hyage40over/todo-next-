import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init"
import Alert from '@mui/material/Alert';
import { useRouter } from "next/router"


const theme = createTheme();

const ErrorMessageAlert = (props) => {
    if (props.errorMessage == "") {
    return;
    }
    return (
    <Box sx={{ marginY: 5 }}>
        <Alert severity="error">{props.errorMessage}</Alert>
    </Box>
    );
};

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { user } = useAuthContext()

    if (user) {
      router.push('/home')
    }


    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("user detail -----", user);
        router.push("/home")
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
        setErrorMessage(errorMessage);
      }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規登録
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  既にアカウントをお持ちの方はログインへ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ErrorMessageAlert errorMessage={errorMessage} />
      </Container>
    </ThemeProvider>
  );
}