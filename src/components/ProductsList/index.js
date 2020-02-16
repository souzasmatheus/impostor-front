import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

function ProductsList({
  fetchProducts,
  searchFailure,
  searchSuccess,
  searchedProducts,
  deleteFromDB,
  deleteSuccess
}) {
  const [checked, setChecked] = useState(false);
  const [products, setProducts] = useState([]);

  const [query, setQuery] = useState();

  const searchProducts = () => {
    if (checked) {
      // Pesquisar
      fetchProducts(query);
    } else {
      // Todos
      fetchProducts();
    }
  };

  const deleteProduct = id => {
    deleteFromDB(id);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          {searchFailure && <Alert severity="error">{searchFailure}</Alert>}
          {searchSuccess && <Alert severity="success">{searchSuccess}</Alert>}
          <CardHeader
            title="Lista de Produtos"
            subheader={
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Todos</Grid>
                  <Grid item>
                    <Switch
                      checked={checked}
                      color="primary"
                      onChange={() => setChecked(!checked)}
                      value="checkedC"
                    />
                  </Grid>
                  <Grid item>Pesquisar</Grid>
                </Grid>
              </Typography>
            }
          />
          <CardContent>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <TextField
                onChange={e => setQuery(e.target.value)}
                fullWidth
                label="Pesquisar"
                variant="outlined"
                disabled={!checked}
              />
              <IconButton onClick={() => searchProducts()}>
                <SearchIcon />
              </IconButton>
            </div>
            {searchedProducts && (
              <>
                {deleteSuccess && (
                  <Alert severity="success">{deleteSuccess}</Alert>
                )}
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Descrição</TableCell>
                        <TableCell align="right">Imposto</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchedProducts.map((product, index) => (
                        <TableRow key={`searchedProduct-${index + 1}`}>
                          <TableCell component="th" scope="row">
                            {product.name}
                          </TableCell>
                          <TableCell align="right">
                            {product.keywords.join(' | ')}
                          </TableCell>
                          <TableCell align="right">{product.tax}%</TableCell>
                          <TableCell>
                            <DeleteIcon
                              style={{ cursor: 'pointer' }}
                              color="secondary"
                              onClick={() => deleteProduct(product._id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ProductsList;
