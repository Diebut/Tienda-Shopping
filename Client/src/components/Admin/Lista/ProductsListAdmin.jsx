import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../../Products/ProductsSlice';
import EditProduct from '../EditProduct';
import { useState } from 'react';

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsListAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [selectedBrand, setSelectedBrand] = useState('');

  const brands = [...new Set(items.map(item => item.brand))];

  const filteredItems = selectedBrand
    ? items.filter(item => item.brand === selectedBrand)
    : items;

  const rows = filteredItems.map(item => {
    return {
      id: item.id,
      imageUrl: item.image?.url || '',
      pName: item.name,
      pDescription: item.description,
      price: item.price?.toLocaleString() || 'N/A'
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { 
      field: 'imageUrl', headerName: 'Imagen', width: 80, 
      renderCell: (params) => (
        <ImageContainer>
          <img src={params.row.imageUrl} alt='' />
        </ImageContainer>
      )
    },
    { field: 'pName', headerName: 'Nombre', width: 150 },
    { field: 'pDescription', headerName: 'Descripción', width: 200 },
    { field: 'price', headerName: 'Precio', width: 100, align: 'right' },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Actions>
          <ActionButton onClick={() => handleDelete(params.row.id)} color="#ff4d4d">
            Eliminar
          </ActionButton>
          <EditProduct porId={params.row.id} />
          <ActionButton onClick={() => navigate(`/product/${params.row.id}`)} color="#4caf50">
            Ver
          </ActionButton>
        </Actions>
      )
    }
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
    console.log("deleting");
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  return (
    <StyledPaper>
      <FilterContainer>
        <label htmlFor="brand-filter">Filtrar por marca:</label>
        <select id="brand-filter" value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Todas las marcas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </FilterContainer>

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

// Estilos adicionales
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 16px;

  label {
    font-size: 14px;
    font-weight: bold;
  }

  select {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
  }
`;

const StyledPaper = styled(Paper)`
  height: 600px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  background-color: #fafafa;
  margin: 0 auto;
`;

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-cell, .MuiDataGrid-columnHeaders {
    color: #333;
    font-size: 14px;
  }
  
  & .MuiDataGrid-columnHeaders {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  & .MuiDataGrid-cell {
    border-bottom: 1px solid #eee;
  }

  & .MuiDataGrid-row:hover {
    background-color: #f9f9f9;
  }

  & .MuiDataGrid-footerContainer {
    border-top: 1px solid #ddd;
  }

  & .MuiCheckbox-root {
    color: #3f51b5;
  }
`;

const ImageContainer = styled.div`
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.color || "#333"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#555"};
  }
`;
