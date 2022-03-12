import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup, Card,Button, ListGroupItem } from 'react-bootstrap'
import Ratings from '../components/Ratings'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails} from '../actions/productAction'
import Loader from '../components/loader'
import Message from '../components/message'


function ProductScreen() {
  const match=useParams()
  const dispatch=useDispatch()

  const productDetails=useSelector(state=>state.productDetails)
  const { product, error,loading }= productDetails
  
  useEffect(()=>{
    dispatch(listProductDetails(match.id))
  },[dispatch,match])

  
  return (
    <>
    <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
    {
      loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
      <Row>
     <Col md={6}>
       <Image src={product.image} alt={product.name} fluid/>
     </Col>
     <Col md={3}>
       <ListGroup variant='flush'>
         <ListGroup.Item>
           <h3>{product.name}</h3>
         </ListGroup.Item>
         <ListGroup.Item>
           <Ratings value={product.rating} 
                    text={`${product.numReviews} reviews`}/>
         </ListGroup.Item>
         <ListGroup.Item>
         Price: ${product.price}
           </ListGroup.Item>
           <ListGroup.Item>
         Description: {product.description}
           </ListGroup.Item>
       </ListGroup>
     </Col>
     <Col md={3}>
       <Card>
         <ListGroup variant='flush'>
           <ListGroupItem>
             <Row>
               <Col>Price:</Col>
               <Col>
                 <strong>${product.price}</strong>
               </Col>
             </Row>
           </ListGroupItem>
           <ListGroup.Item>
             <Row>
               <Col>Status:</Col>
               <Col>
                 {product.countInStock > 0 ? 'In Stock':'Out Of Stock'}
               </Col>
             </Row>
           </ListGroup.Item>
           <ListGroup.Item>
              <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                Add To Cart
              </Button>
           </ListGroup.Item>
         </ListGroup>
       </Card>
     </Col>
   </Row>


    }
   

   </>
  )
}

export default ProductScreen