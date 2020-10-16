import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Card, Image, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    } catch (error) {
      console.log('fetchProduct -> error', error)
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line
  }, [])
  
  const { image, name, rating, numReviews, price, description, countInStock } = product
  if (product) {
    return (
      <>
        <Link className="btn btn-dark my-3" to="/">Go Back</Link>
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
                    <Col>Status: <strong>{countInStock > 0 ? 'In Stock' : 'Out Stock'}</strong> </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button disabled={countInStock === 0} className="btn-block">Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default ProductScreen 
 