import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components";
import { logoutUser } from "../auth/AuthSlice";
import { toast } from "react-toastify";

const Navbar = () => {

    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)

    return (
        <nav className='nav-bar'>
            <Link to={"/"}>
                <h2>DG Tienda Shop</h2>
            </Link>
            <Link to={"/cart"}>
                <div className='nav-bag'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <span className='bag-quantity'>
                        <span>{cartTotalQuantity}</span>
                    </span>
                </div>
            </Link>

            {auth.id ? ( // _id sacamos
                <Links>
                    {auth.isAdmin ? (
                    <div>
                        <Link to="/admin/resumen">Admin</Link>
                    </div>
                    ) : null}
                    
                    <div onClick={()=>{
                        dispatch(logoutUser(null))
                        toast.warning("¡Desconectado!", {position: "bottom-left"})
                    }}>Cerrar Sesión</div>
                </Links>
                ) : (
                <AuthLinks>
                    <Link to={"/login"}>Iniciar Sesion</Link>
                    <Link to={"register"}>Registrarse</Link>
                </AuthLinks>
            )}      
        </nav>
    )
}

export default Navbar

const AuthLinks = styled.div`
    a {
        &:last-child {
        margin-left: 2rem;
    }
    }
`;

const Links = styled.div`
    color: white;
    display: flex;

    div{
        cursor: pointer;
        &:last-child{
            margin-left: 2rem;
        }
    }
`;
