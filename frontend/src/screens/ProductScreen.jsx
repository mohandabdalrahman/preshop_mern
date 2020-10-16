import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Card, Image, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
const ProductScreen = ({match}) => {
  const {image,name,rating,numReviews,price,description,countInStock}=products.find(product=>product._id === match.params.id )
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={rating} text={`${numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              price: ${price}
            </ListGroup.Item>
             <ListGroup.Item>
              Description: {description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: <strong>${price}</strong> </Col>
                </Row>
              </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                  <Col>Status: <strong>{countInStock>0 ? 'In Stock' :'Out Stock'}</strong> </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button disabled={countInStock===0} className="btn-block">Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen 
 