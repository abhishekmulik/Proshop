import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup, Card,Button, ListGroupItem,Form } from 'react-bootstrap'
import Ratings from '../components/Ratings'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import {listProductDetails} from '../actions/productAction'
import Loader from '../components/loader'



function ProductScreen() {
  const [qty,setQty]=useState(1)

  const match=useParams()
  
  const navigate=useNavigate()
 
  const dispatch=useDispatch()

  const productDetails=useSelector(state=>state.productDetails)
  const { product, error,loading }= productDetails
  
  useEffect(()=>{
    dispatch(listProductDetails(match.id))
  },[dispatch,match])

  const addToCartHandler=()=>{
    navigate(`/cart/${match.id}?qty=${qty}`,{ replace: true })
  }
  
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

            {product.countInStock>0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      onChange={e=>setQty(e.target.value)}
                      value={qty}
                    >
                      {
                        [...Array(product.countInStock).keys()].map(x=>(
                          <option key={x+1} value={x+1}>
                              {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

           <ListGroup.Item>
              <Button 
              onClick={addToCartHandler}
              className='btn-block' 
              type='button' 
              disabled={product.countInStock===0}>
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