import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) 
    : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id); // _id sacamos

            if (itemIndex >= 0) {
                state.cartItems[itemIndex] = {
                    ...state.cartItems[itemIndex],
                    cartQuantity: state.cartItems[itemIndex].cartQuantity + 1,
                };
                // state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`aumentó ${state.cartItems[itemIndex].name} cantidad del carrito`, {
                    position: "bottom-left"
                })
            }else{
                const tempProduct = {...action.payload, cartQuantity: 1}

                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} añadido al carrito`, {
                    position: "bottom-left"
                });             
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id); // _id sacamos

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Disminuido ${action.payload.name} cantidad del carrito`, {
                    position: "bottom-left"
                });
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id); // _id sacamos
                
                state.cartItems = nextCartItems;
    
                toast.error(`${action.payload.name} eliminado del carrito`, {
                    position: "bottom-left"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id); // _id sacamos

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            toast.error(`${action.payload.name} eliminado del carrito`, {
                position: "bottom-left"
            }); 
        },
        getTotals(state, action){
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            }, {
                total: 0,
                quantity: 0,
            });
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action){
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            
            toast.error(`Carrito borrado`, {
                position: "bottom-left"
            });
        }
    }
});

export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;
export default cartSlice.reducer;