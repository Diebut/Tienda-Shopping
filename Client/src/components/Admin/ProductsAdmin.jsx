import { Outlet, useNavigate } from "react-router-dom"
import { AdminHeaders, PrimaryButton } from "./CommonStyle"

const ProductsAdmin = () => {

    const navigate = useNavigate()

  return (
    <>
      <AdminHeaders>
        <h2>Products</h2>
        <PrimaryButton onClick={()=> navigate("/admin/products/create-product")}>
            Crear
        </PrimaryButton>
    </AdminHeaders>
        <Outlet/>
    </>
    
  )
}

export default ProductsAdmin
