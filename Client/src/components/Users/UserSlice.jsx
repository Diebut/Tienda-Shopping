import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "../Api/Api";
import { toast } from "react-toastify";

const initialState = {
    list: [],
    status: null,
    deleteStatus: null,
}

export const userFetch = createAsyncThunk("users/usersFetch", async () => {
    try {
        const response = await axios.get(`${url}/users`, setHeaders());
        return response.data;
    } catch (error) {
        console.error("Error en userFetch:", error.response?.data || error.message);
        throw error;  // Lanza el error para que Redux lo maneje en `userFetch.rejected`
    }
});


export const userDelete = createAsyncThunk("users,userDelete", async (id) =>{
    try {
        const response = await axios.delete(`${url}/users/${id}`, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        toast.error(error.response?.data);
        
    }
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
            // Manejo de userFetch
        .addCase(userFetch.pending, (state) => {
            state.status = "pending";
        })
        .addCase(userFetch.fulfilled, (state, action) => {
            state.list = action.payload;
            state.status = "success";
        })
        .addCase(userFetch.rejected, (state) => {
            state.status = "rejected";
        })
        // manejo de userDelete
        .addCase(userDelete.pending, (state) => {
            state.deleteStatus = "pending";
        })
        .addCase(userDelete.fulfilled, (state, action) => {
        if (action.payload) { // Verificar si action.payload tiene datos
            const newList = state.list.filter((user) => user.id !== action.payload.id); // Usar !== para eliminar el usuaario
            state.list = newList;
            state.deleteStatus = "success";
            toast.error("Usuario eliminado!", {
                position: "bottom-left"
            });
        }
        })
        .addCase(userDelete.rejected, (state, action) => {
            state.deleteStatus = "error";
            toast.error(action.payload?.message || "Error al eliminar el Usuario");
        })
    }
})

export default userSlice.reducer;