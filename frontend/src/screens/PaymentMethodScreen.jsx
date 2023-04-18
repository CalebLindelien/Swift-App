import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();

  // Accessing the global state and dispatch function using the useContext hook
  const { state, dispatch: ctxDispatch } = useContext(Store);

  // Destructuring the necessary information from the global state
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  // Using the useState hook to manage the payment method selected by the user
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  // Using the useEffect hook to redirect the user to the shipping screen if no shipping address is provided
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Handling the form submission and updating the global state and local storage
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  // Rendering the Payment Method screen
  return (
    <div>
      {/* Rendering the CheckoutSteps component */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            {/* Creating a button to continue to the next screen */}
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
