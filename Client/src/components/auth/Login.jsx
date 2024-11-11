import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom';
import { loginUser } from "./AuthSlice";
import { StyledForm } from "./StyleForm";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state)=> state.auth);

    // console.log(auth);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(()=>{
        if(auth.id){
            navigate("/cart");
        }
    }, [auth.id, navigate]);

    // console.log("user:", user);

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(user);
        dispatch(loginUser(user))
    }
    
  return (
    <>
        <StyledForm onSubmit={handleSubmit}>
            <h2>Iniciar Sesion</h2>
            <input type="email" placeholder='Email' onChange={(e)=> setUser({...user, email: e.target.value})} />
            <input type="password" placeholder='Password' onChange={(e)=> setUser({...user, password: e.target.value})} />
            <button>
                {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
            </button>
                {auth.loginStatus === "rejected" ? (
            <p>{auth.loginError}</p>) : null}
        </StyledForm>
    </>
    )
}

export default Login

