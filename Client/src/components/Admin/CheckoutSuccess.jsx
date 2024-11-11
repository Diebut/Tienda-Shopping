import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {clearCart, getTotals} from '../Cart/CartSlice';

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state)= state.cart);

  useEffect(()=>{
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getTotals());
  }, [cart, dispatch])

  return (
    <Container>
      <h2>éxito de pago</h2>
        <p>Su pedido puede tardar algún tiempo en procesarse</p>
        <p>Verifique el estado de su pedido en su perfil después de unos 10 minutos.</p>
        <p>En caso de cualquier consulta contacte al soporte al {""}
          <strong>dieguito@gmail.com</strong>
        </p>
    </Container>
  )
}

export default CheckoutSuccess

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2{
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;