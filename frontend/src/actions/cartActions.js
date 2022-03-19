import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import store from '../store'

export const addToCart = (id,qty) => async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty 
        }
    })
    // console.log(store.getState().cart.cartItems)
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))
}

export const removeFromCart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    
    localStorage.setItem('cartItems',JSON.stringify(store.getState().cart.cartItems))
}