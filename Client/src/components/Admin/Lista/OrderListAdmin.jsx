import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ordersEdit, ordersFetch } from '../../Orders/OrderSlice';
import moment from 'moment';

const paginationModel = { page: 0, pageSize: 5 };

export default function OrderListAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.orders);

    React.useEffect(() => {
        dispatch(ordersFetch());
    }, [dispatch]);

    const rows = list && list.map(order => ({
        id: order.id,
        pName: order.name,
        amount: (order.total / 100)?.toLocaleString(),
        pDescription: order.description,
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'pName', headerName: 'Nombre', width: 120 },
        { field: 'amount', headerName: 'Cantidad($)', width: 100 },
        {
            field: 'dStatus', headerName: 'Estado', width: 100,
            renderCell: (params) => {
                const status = params.row.dStatus;
                return (
                    <div>
                        {status === "pending" && <Pending>Pendiente</Pending>}
                        {status === "dispatched" && <Dispatched>Enviado</Dispatched>}
                        {status === "delivered" && <Delivered>Entregado</Delivered>}
                        {!['pending', 'dispatched', 'delivered'].includes(status) && "Error"}
                    </div>
                );
            }
        },
        { field: 'date', headerName: 'Fecha', width: 120 },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 220,
            renderCell: (params) => (
                <Actions>
                    <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>Enviado</DispatchBtn>
                    <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>Entregado</DeliveryBtn>
                    <View onClick={() => navigate(`/order/${params.row.id}`)}>Vista</View>
                </Actions>
            )
        }
    ];

    const handleOrderDispatch = (id) => {
        dispatch(ordersEdit({
            id,
            delivery_status: "dispatched",
        }));
    };

    const handleOrderDeliver = (id) => {
        dispatch(ordersEdit({
            id,
            delivery_status: "delivered",
        }));
    };

    return (
        <StyledPaper>
            <StyledDataGrid

                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableSelectionOnClick
                /* rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                checkboxSelection
                disableSelectionOnClick
                paginationModel={{
                    page: 0,
                    pageSize: 5,
                }} */
            />
        </StyledPaper>
    );
}

// Estilos mejorados
const StyledPaper = styled(Paper)`
  height: 450px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-cell, .MuiDataGrid-columnHeaders {
    color: #333;
  }
  
  & .MuiDataGrid-columnHeaders {
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
    font-size: 14px;
  }

  & .MuiDataGrid-cell {
    border-bottom: 1px solid #eee;
  }

  & .MuiDataGrid-row:hover {
    background-color: #fafafa;
  }

  & .MuiDataGrid-footerContainer {
    border-top: 1px solid #ddd;
  }

  & .MuiCheckbox-root {
    color: #3f51b5;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ButtonBase = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  &:hover {
    opacity: 0.9;
  }
`;

const DispatchBtn = styled(ButtonBase)`
  background-color: #26c6f9;
  &:hover {
    background-color: #21b2e1;
  }
`;

const DeliveryBtn = styled(ButtonBase)`
  background-color: #666cff;
  &:hover {
    background-color: #5a62e0;
  }
`;

const View = styled(ButtonBase)`
  background-color: #72ff28;
  &:hover {
    background-color: #64e122;
  }
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;


/* import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ordersEdit, ordersFetch } from '../../Orders/OrderSlice';
import moment from 'moment';

const paginationModel = { page: 0, pageSize: 5 };

export default function OrderListAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.orders);

    React.useEffect(() => {
        dispatch(ordersFetch());
    }, [dispatch]);

    const rows = list && list.map(order => ({
        id: order.id,
        pName: order.name,
        amount: (order.total / 100)?.toLocaleString(),
        pDescription: order.description,
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'pName', headerName: 'Nombre', width: 120 },
        { field: 'amount', headerName: 'Cantidad($)', width: 100 },
        {
            field: 'dStatus', headerName: 'Estado', width: 100,
            renderCell: (params) => (
                <div>
                    {params.row.dStatus === "pending" ? (<Pending>Pendiente</Pending>) : 
                    params.row.dStatus === "dispatched" ? (<Dispatched>Enviado</Dispatched>) :
                    params.row.dStatus === "delivered" ? (<Delivered>Entregado</Delivered>) : ("Error")}
                </div>
            )
        },
        { field: 'date', headerName: 'Fecha', width: 120 },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 220,
            renderCell: (params) => (
                <Actions>
                    <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>Enviado</DispatchBtn>
                    <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>Entregado</DeliveryBtn>
                    <View onClick={() => navigate(`/order/${params.row.id}`)}>Vista</View>
                </Actions>
            )
        }
    ];

    const handleOrderDispatch = (id) => {
        dispatch(ordersEdit({
            id,
            delivery_status: "dispatched",
        }));
    };

    const handleOrderDeliver = (id) => {
        dispatch(ordersEdit({
            id,
            delivery_status: "delivered",
        }));
    };

    return (
        <StyledPaper>
            <StyledDataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableSelectionOnclick
            />
        </StyledPaper>
    );
}

// Estilos mejorados
const StyledPaper = styled(Paper)`
  height: 450px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-cell, .MuiDataGrid-columnHeaders {
    color: #333;
  }
  
  & .MuiDataGrid-columnHeaders {
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
    font-size: 14px;
  }

  & .MuiDataGrid-cell {
    border-bottom: 1px solid #eee;
  }

  & .MuiDataGrid-row:hover {
    background-color: #fafafa;
  }

  & .MuiDataGrid-footerContainer {
    border-top: 1px solid #ddd;
  }

  & .MuiCheckbox-root {
    color: #3f51b5;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ButtonBase = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  &:hover {
    opacity: 0.9;
  }
`;

const DispatchBtn = styled(ButtonBase)`
  background-color: #26c6f9;
  &:hover {
    background-color: #21b2e1;
  }
`;

const DeliveryBtn = styled(ButtonBase)`
  background-color: #666cff;
  &:hover {
    background-color: #5a62e0;
  }
`;

const View = styled(ButtonBase)`
  background-color: #72ff28;
  &:hover {
    background-color: #64e122;
  }
`;

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
 */