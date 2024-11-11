import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import productsReducer, { productsFetch } from './components/Products/ProductsSlice.jsx';
import cartReducer, { getTotals } from './components/Cart/CartSlice.jsx';
import { productsApi } from './components/Products/ProductsApi.jsx';
import authReducer, { loadUser } from './components/auth/AuthSlice.jsx';
import orderSlice from './components/Orders/OrderSlice.jsx';
import userSlice from './components/Users/UserSlice.jsx'

const store = configureStore({
  reducer:{
    products: productsReducer,
    orders: orderSlice,
    users: userSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(productsApi.middleware)
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null)); // esto va comentado

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
