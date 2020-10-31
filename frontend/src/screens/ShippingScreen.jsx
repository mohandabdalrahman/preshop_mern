import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckkoutSteps from '../components/CheckkoutSteps';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../Redux/Actions/cartActions';
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment')
  };
  return (
    <FormContainer>
      <CheckkoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Enter Your Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            required
            placeholder="Your Address"
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Enter Your City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            required
            placeholder="Your City"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postCode">
          <Form.Label>Enter Your PostCode</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            required
            placeholder="Your postal Code"
            onChange={(e) => setpostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Enter Your Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            required
            placeholder="Your Country"
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
