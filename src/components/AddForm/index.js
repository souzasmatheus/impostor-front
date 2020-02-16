import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';

function AddForm({ addToDB, addFailure, addSuccess, isAdding }) {
  const [name, setName] = useState("");
  const [tax, setTax] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [keywordsArr, setKeywordsArr] = useState([]);
  const [products, setProducts] = useState([]);

  const saveKeyword = () => {
    setKeywordsArr([...keywordsArr, keyword]);
    setKeyword('');
  };

  const removeKeyword = index => {
    const newArr = keywordsArr.filter((el, ind) => ind !== index);
    setKeywordsArr(newArr);
  };

  const addProduct = () => {
    const newProduct = {
      name,
      tax,
      keywords: keywordsArr
    };

    setProducts([...products, newProduct]);
    setName('');
    setTax('');
    setKeywordsArr([]);
  };

  const removeProduct = index => {
    const newArr = products.filter((el, ind) => ind !== index);
    setProducts(newArr);
  };

  const keywordsEl = keywordsArr.map((el, index) => (
    <Paper
      key={`keyword-${index + 1}`}
      variant="outlined"
      style={{
        padding: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '2px'
      }}
    >
      {el}
      <CloseIcon
        onClick={() => removeKeyword(index)}
        style={{ cursor: 'pointer' }}
      />
    </Paper>
  ));

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          {addFailure && <Alert severity="error">{addFailure}</Alert>}
          {addSuccess && <Alert severity="success">{addSuccess}</Alert>}
          <CardHeader title="Adicione um produto" />
          <CardContent>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <TextField
                onChange={e => setName(e.target.value)}
                value={name}
                fullWidth
                label="Nome"
                variant="outlined"
              />
              <TextField
                style={{ marginLeft: '10px' }}
                onChange={e => setTax(Number(e.target.value).toFixed(2))}
                type="number"
                label="Imposto"
                variant="outlined"
              />
            </div>

            <div style={{ display: 'flex' }}>
              <TextField
                fullWidth
                label="Palavras-chave"
                variant="outlined"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
              <IconButton onClick={() => saveKeyword()}>
                <AddIcon />
              </IconButton>
            </div>
            {keywordsEl.length > 0 && (
              <Paper style={{ padding: '10px' }} variant="outlined">
                {keywordsEl}
              </Paper>
            )}
            <Button
              onClick={() => addProduct()}
              fullWidth
              style={{ marginTop: '10px' }}
              variant="outlined"
            >
              Adicionar produto
            </Button>
          </CardContent>
          {products.length > 0 && (
            <>
              <Card>
                <CardHeader title="Produtos" />
                <CardContent>
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
                        {products.map((product, index) => (
                          <>
                            <TableRow key={`product-${index + 1}`}>
                              <TableCell component="th" scope="row">
                                {product.name}
                              </TableCell>
                              <TableCell align="right">
                                {product.keywords.join(' | ')}
                              </TableCell>
                              <TableCell align="right">
                                {product.tax}%
                              </TableCell>
                              <TableCell>
                                <DeleteIcon
                                  style={{ cursor: 'pointer' }}
                                  color="secondary"
                                  onClick={() => removeProduct(index)}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <Button
                  fullWidth
                  style={{ marginTop: '10px' }}
                  variant="outlined"
                  onClick={() => addToDB(products)}
                >
                  {isAdding ? 'Loading...' : 'Enviar para o banco de dados'}
                </Button>
              </Card>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}

export default AddForm;
