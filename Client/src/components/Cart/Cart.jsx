import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from './CartSlice';
import PayButton from "../Paybutton/PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getTotals())
  }, [cart, dispatch]);


  const handleRemoveFromCart = (product)=>{ //  poner product = cartItem
    dispatch(removeFromCart(product))
  };

  const handleDecreaseCart =(product)=>{
    dispatch(decreaseCart(product))
  };

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product))
  };

  const handleClearCart = ()=>{
    dispatch(clearCart())
  };

  return (
    <div className='cart-container'>
      <h2>Carro de Compras</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Su carrito está actualmente vacío</p>
          <div className='start-shopping'>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-arrow-left" 
              viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
              <span>empezar a comprar</span>
            </Link>
          </div>
        </div>
      ) : (<div>
            <div className='titles'>
              <h3 className='product-title'>Productos</h3>
              <h3 className='price'>Precio</h3>
              <h3 className='Quantity'>Cantidad</h3>
              <h3 className='total'>Total</h3>
            </div>
            <div className='cart-items'>
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                <div className='cart-item' key={cartItem.id}>
                  <div className='cart-product'>
                    <img src={cartItem.image?.url} alt={cartItem.name} /> {/* agregue url */}
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={()=> handleRemoveFromCart(cartItem)}>↩ Remover</button>
                    </div>
                  </div>
                  <div className='cart-product-price'>${cartItem.price}</div>
                  <div className='cart-product-quantity'>
                    <button onClick={()=>handleDecreaseCart(cartItem)}>-</button>
                    <div className='count'>{cartItem.cartQuantity}</div>
                    <button onClick={()=> handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
              <div className="cart-summary">
                <button className="clear-btn" onClick={()=> handleClearCart()}>Limpiar carrito</button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <p>Impuestos y envío calculados al finalizar la compra</p>
                  
                  {auth.id ? ( // _id sacamos
                    <PayButton cartItems={cart.cartItems}/>
                    ) : (
                    <button className='cart-login' onClick={()=>navigate("/login")}>Inicie sesión para pagar</button>)}
                  
                  <div className='continue-shopping'>
                    <Link to="/">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      fill="currentColor" 
                      className="bi bi-arrow-left" 
                      viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                      </svg>
                      <span>Continue a comprar</span>
                    </Link>
                  </div>
                </div>
              </div>

          </div>
    )}
    </div>
  )
}

export default Cart

