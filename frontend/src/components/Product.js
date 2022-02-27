import React from 'react';
import { Card } from 'react-bootstrap';
import Ratings from './Ratings'
import {Link} from "react-router-dom"

function Product({product}) {
  return (<div>
      <Card className='my-3 p-3 rounded'>
          <Link to={`/product/${product._id}`}>
               <Card.Img src={product.image} variant='top'/>
          </Link>
      
 
      <Card.Body>
          <Link to={`/product/${product._id}`}>
              <Card.Title as='div'>
                  <strong>{product.name}</strong>
              </Card.Title>
          </Link>

          <Card.Text as='div'>
              <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
          </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
      </Card>
  </div>);
}

export default Product;
