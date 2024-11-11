import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { url } from '../Api/Api';

/* export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => `products`,
        }),
        }),
    }); */

export const productsApi = createApi({
reducerPath: 'productsApi',
baseQuery: fetchBaseQuery({ baseUrl: `${url}`, 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token"); // o de tu estado de Redux
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
}),

    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => 'products', // La ruta para obtener todos los productos
        }),
    }),
});

export const  { useGetAllProductsQuery} = productsApi;

