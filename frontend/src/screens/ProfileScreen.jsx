import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userAction';
const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (user === undefined || _.isEmpty(user)) {
        dispatch(getUserDetails('profile'));
        setShow(false);
      } else {
        const { name, email } = user;
        setName(name);
        setEmail(email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      dispatch(updateUserProfile({ email, password, name }));
      setShow(true);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success" show={show}>
            {' '}
            Profile Updated{' '}
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Enter Your Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Enter Your Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Your Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
