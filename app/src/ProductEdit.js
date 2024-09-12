import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const ProductEdit = () => {
  const initialFormState = {
    name: '',
    address: '',
    city: '',
    stateOrProvince: '',
    country: '',
    postalCode: ''
  };
  const [product, setProduct] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/product/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data));
    }
  }, [id, setProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/product${product.id ? `/${product.id}` : ''}`, {
      method: (product.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    setProduct(initialFormState);
    navigate('/product');
  }

  const title = <h2>{product.id ? 'Edit Product' : 'Add Product'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={product.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="Image">Image</Label>
            <Input type="file" name="Image" id="Image" value={product.Image || ''}
                   onChange={handleChange} autoComplete="address-level1"/>
          </FormGroup>

          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="quantity">Quantity</Label>
              <Input type="text" name="quantity" id="quantity" value={product.quantity || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="price">Price</Label>
              <Input type="text" name="price" id="price" value={product.price || ''}
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup> 
          </div>

          <FormGroup className="col-md-3 mb-3">
              <Label for="enabled">Enabled</Label>
              <Input type="checkbox" name="enabled" id="enabled"
                     onChange={handleChange} autoComplete="address-level1"/>
            </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ProductEdit;
