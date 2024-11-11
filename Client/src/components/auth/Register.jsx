import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom';
import { registerUser } from "./AuthSlice";
import { StyledForm } from "./StyleForm";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state)=> state.auth);

    console.log(auth);

    useEffect(()=>{
        if(auth.id){
            navigate("/cart");
        }
    }, [auth.id, navigate]);
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    console.log("user:", user);
    const handleSubmit = (e)=>{
        e.preventDefault();

        dispatch(registerUser(user))
    }
    
    return (
    <>
        <StyledForm onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <input type="text" placeholder='Nombre' onChange={(e)=> setUser({...user, name: e.target.value})} />
            <input type="email" placeholder='Email' onChange={(e)=> setUser({...user, email: e.target.value})} />
            <input type="password" placeholder='Password' onChange={(e)=> setUser({...user, password: e.target.value})} />
            <button>
                {auth.registerStatus === "pending" ? "Submitting..." : "Register"}
            </button>
                {auth.registerStatus === "rejected" ? (
            <p>{auth.registerError}</p>) : null}
        </StyledForm>
    </>
    )
}

export default Register
