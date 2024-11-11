import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userDelete, userFetch } from '../../Users/UserSlice';

const paginationModel = { page: 0, pageSize: 5 };

export default function UserListAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(userFetch());
    }, [dispatch]);

    const rows = list && list.map(user => {
        return {
            id: user.id,
            uName: user.name,
            uEmail: user.email,
            isAdmin: user.isAdmin,
        };
    });

    const columns = [
        { field: 'uName', headerName: 'Nombre', flex: 1, minWidth: 150 },
        { field: 'uEmail', headerName: 'Email', flex: 1.5, minWidth: 200 },
        {
            field: 'isAdmin', headerName: 'Role', flex: 0.5, minWidth: 100,
            renderCell: (params) => (
                <div>
                    {params.row.isAdmin ? <Admin>Admin</Admin> : <Customer>Cliente</Customer>}
                </div>
            )
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            flex: 0.7,
            minWidth: 120,
            renderCell: (params) => (
                <Actions>
                    <Delete onClick={() => handleDelete(params.row.id)}>Eliminar</Delete>
                    <View onClick={() => navigate(`/user/${params.row.id}`)}>Ver</View>
                </Actions>
            )
        }
    ];

    const handleDelete = (id) => {
        dispatch(userDelete(id));
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
  margin: auto;
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
    color: #333;
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

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ButtonBase = styled.div`
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

const Delete = styled(ButtonBase)`
  background-color: #ff4d4d;
  &:hover {
    background-color: #e04141;
  }
`;

const View = styled(ButtonBase)`
  background-color: #72ff28;
  &:hover {
    background-color: #64e122;
  }
`;