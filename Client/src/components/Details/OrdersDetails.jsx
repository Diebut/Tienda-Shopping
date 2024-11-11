import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setHeaders, url } from "../Api/Api";

const OrdersDetails =()=>{
  const params = useParams();

  const [order, setOrder] = useState({});
  console.log(order);
  
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchOrder = async ()=>{
      try {
        setLoading(true);
        const res = await axios.get(`${url}/orders/findOne/${params.id}`, setHeaders());
        setOrder(res.data);
        setLoading(false);

      } catch (error) {
        console.log(error);
        
      }
    };
    fetchOrder();
  }, [params.id]);

  return(

    <StyledOrder>
      {loading ? (<p>Cargando...</p>) : (
        <>
          <OrdersContainer>
            <h2>Detalles de Orden</h2>
            <p>Delivery status: {""}
              {order.delivery_status === "pending" ? (
                <Pending>Pendiente</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>Enviado</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>Entregado</Delivered>
              ) : (
                "error"
              )}
            </p>

              <h3>ORdenes de PRoductos</h3>
              <Items>
                {order.products?.map((product, index)=>(
                  <Item key={index}>
                    <span>{product.description}</span>
                    <span>{product.quantity}</span>
                    <span>
                      {"$" + (product.amount_total / 100).toLocaleString()}
                    </span>
                  </Item>
                ))}
              </Items>
              <div>
                <h3>Precio Total</h3>
                <p>{"$" + (order.total / 100).toLocaleString()}</p>
              </div>
              <div>
                <h3>Detalles de Envío</h3>
                <p>Cliente : {order.shipping?.name}</p>
                <p>Ciudad: {order.shipping?.address.city}</p>
                <p>Email: {order.shipping?.email}</p>
              </div>

          </OrdersContainer>
        </>
      )}
    </StyledOrder>

  )
};

export default OrdersDetails

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3{
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  heigth: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }  
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgbs(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;