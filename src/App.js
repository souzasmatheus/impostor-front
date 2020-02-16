import React, { useState } from 'react';
import './App.scss';
import Login from './components/Login';
import Home from './components/Home';
import Container from '@material-ui/core/Container';

function App() {
  const [authToken, setAuthToken] = useState(null);

  if (authToken) {
    return (
      <Container>
        <Home authToken={authToken} />
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
