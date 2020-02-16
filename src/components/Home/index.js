import React, { useState } from 'react';
import Axios from 'axios';
import AddForm from '../AddForm';

function Home({ authToken }) {
  const [addSuccess, setAddSuccess] = useState(null);
  const [addFailure, setAddFailure] = useState(null);
  const [isAdding, setIsAdding] = useState(null);

  const addToDB = async products => {
    setAddFailure(null);
    setAddSuccess(null);
    setIsAdding(true);
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/add-products`,
        { products },
        { headers: { 'auth-token': authToken } }
      );

      setAddSuccess(res.data.message);
      setIsAdding(false);
    } catch (error) {
      setAddFailure('There has been an error sending data');
      setIsAdding(false);
    }
  };

  return (
    <AddForm
      addToDB={addToDB}
      addSuccess={addSuccess}
      addFailure={addFailure}
      isAdding={isAdding}
    />
  );
}

export default Home;
