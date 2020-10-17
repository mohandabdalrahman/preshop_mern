import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  ListGroup,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { fetchProductDetails } from '../Redux/Actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
    // eslint-disable-next-line
  }, [dispatch, match]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCart = () => {
    history.push(
      `/cart/${match.params.id}?qty=${quantity === 0 ? quantity + 1 : quantity}`
    );
  };

  const {
    image,
    name,
    rating,
    numReviews,
    price,
    description,
    countInStock,
  } = product;
  if (product) {
    return (
      <>
        <Link className="btn btn-dark my-3" to="/">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={rating} text={`${numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>price: ${price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price: <strong>${price}</strong>{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:{' '}
                        <strong>
                          {countInStock > 0 ? 'In Stock' : 'Out Stock'}
                        </strong>{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCart}
                      disabled={countInStock === 0}
                      className="btn-block"
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
  }
};

export default ProductScreen;
