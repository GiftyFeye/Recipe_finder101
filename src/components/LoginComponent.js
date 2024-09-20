import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  margin-right: 50px;
`;

const LoginIconStyled = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

function LoginComponent({ icon, setUser }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Simulate user login by setting a user object
    setUser({ email });
    handleClose();
  };

  return (
    <>
      <LoginButton onClick={handleClickOpen}>
        <LoginIconStyled src={icon} alt="login icon" />
        Login
      </LoginButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LoginComponent;
