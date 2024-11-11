import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import{url, setHeaders} from '../Api/Api'
import { toast } from "react-toastify";

const initialState = {
    items:[],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
}

// Ejemplo de obtener productos
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const token = localStorage.getItem("token"); // Usar el mismo nombre definido al guardar el token
    console.log("Token recuperado para obtener productos:", token); // Verificar token

    if (!token) {
      throw new Error("Token no proporcionado");
    }
    
    try {
      const response = await axios.get(`${url}/products`, { 
        headers: { Authorization: `Bearer ${token}` }, // Usa el token recuperado de localStorage
      });
      
      return response.data;
    } catch (error) {
      console.log("Error al obtener productos:", error.response?.data);
      throw error;
    }
  }
);

export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values) => {
      try {
        const response = await axios.post(`${url}/products`, values, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );
  export const productsEdit = createAsyncThunk(
    "products/productsEdit",
    async (values, { rejectWithValue }) => {
      try {
        console.log("Product ID:", values.product.id); // Verificar el ID
        const response = await axios.put(`${url}/products/${values.product.id}`, values, setHeaders());
        console.log("Respuesta del servidor:", response.data); // Verificar datos actualizados
        return response.data;
      } catch (error) {
        console.log("Error en productsEdit:", error);
        toast.error(error.response?.data || "Error al editar el producto");
        return rejectWithValue(error.response?.data || "Error al editar el producto");
      }
    }
  );
  
  export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async (id) => {
      try {
        const response = await axios.delete(`${url}/products/${id}`, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Manejo de productsFetch
        .addCase(productsFetch.pending, (state) => {
            state.status = "pending";
        })
        .addCase(productsFetch.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        })
        .addCase(productsFetch.rejected, (state) => {
            state.status = "rejected";
        })

        // Manejo de productsCreate
        .addCase(productsCreate.pending, (state) => {
            state.createStatus = "pending";
        })
        .addCase(productsCreate.fulfilled, (state, action) => {
          if (action.payload) {
              state.items.push(action.payload);
              state.createStatus = "success";
              toast.success("Producto creado!");
          }
        })
        .addCase(productsCreate.rejected, (state, action) => {
            state.createStatus = "error";
            toast.error(action.payload?.message || "Error al crear el producto");
        })

        // Manejo de productsEdit
        .addCase(productsEdit.pending, (state) => {
          state.editStatus = "pending";
        })
      
        .addCase(productsEdit.fulfilled, (state, action) => {
            const updatedProduct = action.payload.product;
            const index = state.items.findIndex(item => item.id === updatedProduct.id);
            if (index !== -1) {
              state.items[index] = updatedProduct; // Actualiza el producto en el estado
            }
            state.editStatus = "success";
          })
        
        
        /* .addCase(productsEdit.fulfilled, (state, action) => {
          if (action.payload) { // Verificar si action.payload tiene datos
            const updatedProducts = state.items.map((product) =>
              product.id === action.payload.id ? action.payload : product
            );
            state.items = updatedProducts;
            state.editStatus = "success";
            toast.info("Producto editado!");
          }
        }) */
        .addCase(productsEdit.rejected, (state, action) => {
          state.editStatus = "error";
          toast.error(action.payload?.message || "Error al eliminar el producto");
        })

       // Manejo de productsDelete
        .addCase(productsDelete.pending, (state) => {
          state.deleteStatus = "pending";
        })
        .addCase(productsDelete.fulfilled, (state, action) => {
          if (action.payload) {
            const newList = state.items.filter((item) => item.id !== action.payload.id); // Usar !== para eliminar el producto
            state.items = newList;
            state.deleteStatus = "success";
            toast.error("Producto eliminado!");
          }
        })
          .addCase(productsDelete.rejected, (state, action) => {
            state.deleteStatus = "error";
            toast.error(action.payload?.message || "Error al eliminar el producto");
        })
          
      },
        devTools: process.env.NODE_ENV !== 'production', // Asegura que está habilitado solo en desarrollo
    
})


export default ProductSlice.reducer