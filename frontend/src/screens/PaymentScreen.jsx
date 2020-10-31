import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckkoutSteps from '../components/CheckkoutSteps';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../Redux/Actions/cartActions';
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckkoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              id="PayPal"
              name="paymentMethod"
              type="radio"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
              label="PayPal or Credit Card"
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
