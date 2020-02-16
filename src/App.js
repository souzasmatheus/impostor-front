import React, { useState } from 'react';
import './App.scss';
import Login from './components/Login';
import Container from '@material-ui/core/Container';

function App() {
  const [authToken, setAuthToken] = useState(null);

  if (authToken) {
    return (
      <Container maxWidth="md">
        <h1>HOME</h1>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        <Login setAuthToken={setAuthToken} />
      </Container>
    );
  }
}

export default App;
