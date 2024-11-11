import './App.css';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import Navbar from './components/templates/Navbar';
import Cart from './components/Cart/Cart';
import Home from './components/page/Home';
import NotFound from './components/Utils/NotFound';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import ProductsAdmin from './components/Admin/ProductsAdmin';
import ResumenAdmin from './components/Admin/ResumenAdmin';
import CreateProduct from './components/Admin/CreateProduct';
import CheckoutSuccess from './components/Admin/CheckoutSuccess';
import ProductsListAdmin from './components/Admin/Lista/ProductsListAdmin';
import UsersAdmin from './components/Admin/UsersAdmin';
import OrdersAdmin from './components/Admin/OrdersAdmin';
import ProductsDetails from './components/Details/ProductsDetails';
import OrdersDetails from './components/Details/OrdersDetails';
import UserProfile from './components/Details/UserProfile';
import { Footer } from './components/templates/Footer/Footer';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/register" element={< Register />} />
          <Route path="/login" element={< Login />} />
          <Route path="/product/:id" element={< ProductsDetails />} />
          <Route path="/order/:id" element={< OrdersDetails />} />
          <Route path="/user/:id" element={< UserProfile />} />
          <Route path="/admin" element={< DashboardAdmin />}>
            <Route path="products" element={< ProductsAdmin />}>
              <Route index element={< ProductsListAdmin />} />
              <Route path="create-product" element={< CreateProduct />} />
            </Route>
            <Route path="resumen" element={< ResumenAdmin />} />
            <Route path="users" element={< UsersAdmin />} />
            <Route path="orders" element={< OrdersAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
