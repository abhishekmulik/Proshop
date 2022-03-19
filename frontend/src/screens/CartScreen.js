import React, {useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, CardGroup } from 'react-bootstrap'
import Message from '../components/message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
  const productId=useParams().id
  const qty = window.location.search ? Number(window.location.search.split('=')[1]):1

  const dispatch = useDispatch()
  const cart = useSelector(state=> state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id)=>{
      dispatch(removeFromCart(id))
  }

  const checkOutHandler=()=>{
    console.log('checked out')
  }

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId, qty])
  

   

  return (
  <>
  <Row>
    <Col md={8}>
    <h1>Shopping Cart</h1>
    {cartItems.length===0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
    :(
      <ListGroup variant='flush'>
        {cartItems.map(item=>(
          <ListGroup.Item key={item.productId}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded/>
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.productId}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                <Form.Control
                      as="select"
                      onChange={e=>dispatch(addToCart(item.product,
                      Number(e.target.value)))}
                      value={item.qty}
                    >
                      {
                        [...Array(item.countInStock).keys()].map(x=>(
                          <option key={x+1} value={x+1}>
                              {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={()=>
                  removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      ) }
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Subtotal Items ({cartItems.reduce((acc,item)=>acc+item.qty, 0)})</h2>
          ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button 
            type="button"
            classname='btn btn-block'     
            disabled={cartItems.length===0}
            onClick={checkOutHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  </>
  )
                  }
export default CartScreen