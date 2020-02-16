import React, { useState } from 'react';
import Axios from 'axios';
import './styles.scss';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

function Login({ setAuthToken }) {
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        {
          password
        }
      );

      setAuthToken(res.headers['auth-token']);
    } catch (error) {
      setError('Ocorreu um erro. Por favor, tente fazer login novamente.');
    }
  };

  return (
    <>
      <Typography
        paragraph
        style={{ marginTop: '5%', marginBottom: '5%' }}
        align="center"
        variant="h2"
      >
        Identifique-se, estatista!
      </Typography>
      {error && (
        <Alert style={{ marginBottom: '3%' }} severity="error">
          {error}
        </Alert>
      )}
      <TextField
        type="password"
        style={{ float: 'right' }}
        fullWidth
        id="outlined-basic"
        label="Senha"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        onClick={() => login()}
        style={{ float: 'right', marginTop: '3%' }}
        variant="outlined"
      >
        Login
      </Button>
    </>
  );
}

export default Login;
