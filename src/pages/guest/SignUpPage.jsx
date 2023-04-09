import { Grid as MuiGrid, TextField, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { UserRoles } from '../../lib/contants/common';
import { signUp } from '../../store/auth/authThunk';


export const SignUpPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("")
  const dispatch = useDispatch()
   
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
      const data = {
        email,
        name,
        password,
        role: UserRoles.ADMIN,
    }
    dispatch(signUp(data))
        .unwrap()
        .then(() => navigate('/'))
        .catch((e) => setError(e.response.data.message))
  };

  return (
    <Grid>
      <Form onSubmit={submitHandler}>
        <TextField value={name} onChange={nameChangeHandler} label="name" />
        <TextField value={email} onChange={emailChangeHandler} label="email" />
        <TextField value={password} onChange={passwordChangeHandler} label="Password" />
        <TextField
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          label="Confirm Password"
        />
        {
          error &&  
          <Typography textAlign="center" sx={{ color: (theme) => theme.palette.error.main }}>
          {error}
          </Typography>
        }
        <Button type="submit">SignUp</Button>
        <Link to={'/signin'}>Have an account?</Link>
      </Form>
    </Grid>
  );
};
const Grid = styled(MuiGrid)(() => ({
  width: '500px',
  margin: '9rem auto',
}));
const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  gap: '20px',
}));
