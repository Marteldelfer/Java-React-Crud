import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProducts = [...products].filter(i => i.id !== id);
      setProducts(updatedProducts);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const ProductList = products.map(product => {
    return <tr key={product.id}>
      <td>
        <img src={product.imagePath}></img>
      </td>
      <td style={{whiteSpace: 'nowrap'}}>{product.name}</td>
      <td style={{whiteSpace: 'nowrap'}}>{product.quantity}</td>
      <td style={{whiteSpace: 'nowrap'}}>{product.price}</td>
      <td style={{whiteSpace: 'nowrap'}}>{product.createdAt}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/products/" + product.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(product.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/product/new">Add Product</Button>
        </div>
        <h3>My JUG Tour</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Image</th>
            <th width="20%">Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Created At</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {ProductList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProductList;