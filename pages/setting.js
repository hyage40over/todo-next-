import * as React from 'react';
import Container from '@mui/material/Container';
import { useAuthContext } from "../src/context/AuthContext"


import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';




function InputWithIcon() {
  const { user } = useAuthContext()
  console.log("user---------", user);
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="outlined-read-only-input"
        label="アカウント"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        //userがない場合は代入しない
        value={user?.email}
      />
    </Box>
  );
}



export default function Setting() {
  return (
    <Container>
        <div align="right">
          <InputWithIcon />
        </div>
    </Container>
  );




}