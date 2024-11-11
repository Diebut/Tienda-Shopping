import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "../Api/Api";

const initialState = {
    list: [],
    status: null,
};

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
    try {
        const response = await axios.get(`${url}/orders`, setHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        throw error; // Lanza el error para que Redux lo capture
    }
});

/* export const createOrder = async (cartItems, userId) => {
    try {
        const response = await axios.post('http://localhost:3001/api/orders', {
            userId,
            cartItems, // El carrito debe ser un array de objetos con la estructura { productId, quantity }
        });

        console.log("Order created:", response.data); // Aquí verás la respuesta con la orden creada
    } catch (error) {
        console.error("Error creating order:", error);
    }
}; */

export const ordersEdit = createAsyncThunk(
    "orders/ordersEdit",
    async (values, { getState }) => {
        const state = getState();
        const currentOrder = state.orders.list.find(
            (order) => order.id === values.id
        );
        
        const newOrder = {
            ...currentOrder,
            delivery_status: values.delivery_status,
        };
        
        try {
            const response = await axios.put(`${url}/orders/${values.id}`, newOrder, setHeaders());
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ordersFetch.pending, (state) => {
                state.status = "pending";
            })
            .addCase(ordersFetch.fulfilled, (state, action) => {
                console.log("Orders fetched:", action.payload);
                state.list = action.payload;
                state.status = "success";
            })

            .addCase(ordersFetch.rejected, (state) => {
                state.status = "rejected";
            })
            // editar
            .addCase(ordersEdit.pending, (state) => {
                state.status = "pending";
            })
            .addCase(ordersEdit.fulfilled, (state, action) => {
                state.list = state.list.map((order) =>
                    order.id === action.payload?.id ? action.payload : order
                );
                state.status = "success";
            })
            .addCase(ordersEdit.rejected, (state) => {
                state.status = "rejected";
            });
    },
});

export default orderSlice.reducer;
