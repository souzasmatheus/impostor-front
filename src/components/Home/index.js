import React, { useState } from 'react';
import Axios from 'axios';
import AddForm from '../AddForm';
import ProductsList from '../ProductsList';
import { Container, Grid } from '@material-ui/core';

function Home({ authToken }) {
  const [addSuccess, setAddSuccess] = useState(null);
  const [addFailure, setAddFailure] = useState(null);
  const [isAdding, setIsAdding] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState(null);
  const [searchFailure, setSearchingFailure] = useState(null);
  const [searchSuccess, setSearchingSuccess] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

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

  const deleteFromDB = async _id => {
    setDeleteSuccess(null);
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/product`,
        {
          headers: {
            'auth-token': authToken
          },
          data: { _id }
        }
      );

      const newProductsArr = searchedProducts.filter(el => el._id !== _id);
      setSearchedProducts(newProductsArr);
      setDeleteSuccess(res.data.message);
    } catch (error) {
      setAddFailure('There has been an error tryinh to delete product');
    }
  };

  async function fetchProducts() {
    setSearchingFailure(null);
    setSearchingSuccess(null);
    if (arguments[0]) {
      // Pesquisar
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/search?product=${arguments[0]}`
        );

        setSearchedProducts(res.data.products);
      } catch (error) {
        setSearchingFailure('There has been an error trying to fetch products');
      }
    } else {
      // Todos
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/product/all`
        );

        setSearchedProducts(res.data.products);
        if (res.data.products.length > 0) {
          setSearchingSuccess('Products successfully fetched');
        } else {
          setSearchingSuccess('Start adding products to database :)');
        }
      } catch (error) {
        setSearchingFailure('There has been an error trying to fetch products');
      }
    }
  }

  return (
    <Grid container>
      <Grid style={{ marginTop: '10%' }} item xs={12} md={6}>
        <AddForm
          addToDB={addToDB}
          addFailure={addFailure}
          addSuccess={addSuccess}
          isAdding={isAdding}
        />
      </Grid>
      <Grid style={{ marginTop: '10%' }} item xs={12} md={6}>
        <ProductsList
          searchFailure={searchFailure}
          searchSuccess={searchSuccess}
          searchedProducts={searchedProducts}
          fetchProducts={fetchProducts}
          deleteSuccess={deleteSuccess}
          deleteFromDB={deleteFromDB}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
