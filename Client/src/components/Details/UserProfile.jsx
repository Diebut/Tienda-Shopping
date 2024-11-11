import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders, url } from '../Api/Api';
import { Form, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: 0,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/users/find/${params.id}`, setHeaders());
        console.log("User data:", res.data);
        setUser({
          ...res.data,
          password: "", // Limpia la contraseña por seguridad
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    // Evitar enviar el campo 'password' si está vacío
    const updatedUser = { ...user };
    if (!updatedUser.password) {
      delete updatedUser.password;
    }

    try {
      const res = await axios.put(`${url}/users/${params.id}`, updatedUser, setHeaders());
      setUser({ ...res.data, password: "" });
      toast.success("Perfil modificado...");
    } catch (error) {
      console.log(error);
      toast.error("Error al modificar el perfil.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <StyledProfile>
      <ProfilContainer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <h3>Perfil Usuario</h3>
            {user.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Cliente</Customer>
            )}
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit" disabled={updating}>
              {updating ? "Actualizando..." : "Actualizar Perfil"}
            </button>
          </Form>
        )}
      </ProfilContainer>
    </StyledProfile>
  );
};

export default UserProfile;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfilContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-bottom: 0.5rem;
    }

    label {
      margin-bottom: 0.2rem;
      color: gray;
    }

    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
    }

    button {
      cursor: pointer;
      padding: 0.5rem 1rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      &:disabled {
        background-color: #ccc;
      }
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
