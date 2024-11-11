import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {FaUsers, FaStore, FaClipboard, FaTachometerAlt} from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {

    const auth = useSelector((state)=> state.auth)

    if(!auth.isAdmin) return <p>Acceso denegado!</p>
    
    return (
        <StyledDashboard>
            <SideNav>
                <h3>enlaces rápidos</h3>
                <NavLink className={({isActive})=> isActive ? "Link-active" : "Link-inactive"} to={"/admin/resumen"}>
                    <FaTachometerAlt/> Resumen </NavLink>
                <NavLink className={({isActive})=> isActive ? "Link-active" : "Link-inactive"} to={"/admin/orders"}>
                    <FaClipboard/> Ordenes</NavLink>
                <NavLink className={({isActive})=> isActive ? "Link-active" : "Link-inactive"} to={"/admin/products"}>
                    <FaStore/> Productos</NavLink>
                <NavLink className={({isActive})=> isActive ? "Link-active" : "Link-inactive"} to={"/admin/users"}>
                    <FaUsers/> Usuarios</NavLink>
            </SideNav>
            <Content>
                <Outlet />
            </Content>

        </StyledDashboard>
    )
}

export default DashboardAdmin

const StyledDashboard = styled.div`
    display: flex;
    height: 100dvh;
`;

const SideNav = styled.div`
    border-right: 1px solid gray;
    height: calc(100dvh - 70px);
    position: fixed;
    overflow-y: auto;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    
h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
}

a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg{
        margin-right: 0.5rem;
        font-size: 18px;
    }
}
`;

const Content  = styled.div`

    margin-left: 200px;
    padding: 2rem 3rem;
    widht: 100%;

`;

