import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from '../Api/Api';
import {jwtDecode} from "jwt-decode";

const initialState = {

  token: localStorage.getItem("token"),
  name: "",
  email: "",
  id: "",
  isAdmin: 0,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

// Registrar usuario
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => { // probar con values => user
    try {
      const response = await axios.post(`${url}/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);

        // Decodificar el token para extraer los datos del usuario
        const userDecoded = jwtDecode(token);
        return { ...userDecoded, token };
      } else {
        return rejectWithValue("Token no recibido al registrar");
      }
    } catch (error) {
      const errorMsg = error.response?.data || error.message || "Error en el registro";
      console.error("Error en el registro:", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Iniciar sesión
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);

        // Decodificar el token para extraer los datos del usuario
        const userDecoded = jwtDecode(token);
        return { ...userDecoded, token };
      } else {
        return rejectWithValue("Token no recibido al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Error en el login");
    }
  }
);

/* export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
      try {
          const response = await axios.post(`${url}/login`, {
            email: user.email,
            password: user.password,
          });

          return response.data; // Asegúrate de que el backend devuelve el usuario o el token
      } catch (error) {
          console.error("Error en el login:", error.response.data);
          return rejectWithValue(error.response.data); // Maneja el error correctamente
      }
  }
); */

// Obtener usuario
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response?.data || "Error al obtener el usuario");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        id: "",
        isAdmin: 0,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { token, name, email, id, isAdmin } = action.payload;
        return {
          ...state,
          token,
          name,
          email,
          id,
          isAdmin,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { token, name, email, id, isAdmin } = action.payload;
        return {
          ...state,
          token,
          name,
          email,
          id,
          isAdmin,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});


/* const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state) {
      const token = state.token;

      if (token) {
        try {
          const user = jwtDecode(token);
          state.name = user.name;
          state.email = user.email;
          state.id = user.id; // _id sacamos
          state.isAdmin = user.isAdmin;
          state.userLoaded = true;

        } catch (error) {
          console.error("Token inválido o faltante en loadUser");
          state.token = null;
          localStorage.removeItem("token");
        }
      }else return { ...state, userLoaded: true };
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      return {
        ...initialState,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // const token = action.payload;
        const { token, id, name, email, isAdmin } = action.payload; // Extrae el payload

        if (token) {
          if (token) {
            state.token = token;
            state.name = name; // Asegúrate de que estás asignando los valores
            state.email = email;
            state.id = id; // _id sacamos
            state.isAdmin = isAdmin;
            state.loginStatus = "success";
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.payload || "Error desconocido en login";
      });
  },
}); */

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;