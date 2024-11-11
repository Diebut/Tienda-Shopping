import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import { useState } from "react";
import { PrimaryButton } from "./CommonStyle";
import { productsCreate } from "../Products/ProductsSlice";
// import { useNavigate } from "react-router-dom"; // Asegúrate de importar `useNavigate`

const CreateProduct = () => {

  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const { createStatus } = useSelector((state) => state.products); //le habia sacado, pero no funciona

  const [productImg, setProductImg] = useState("")
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  console.log(productImg);
  

  const handleProductImageUpload =(e)=>{
    const file = e.target.files[0];
    console.log(file);
    transformFileData(file)
  }

  const transformFileData =(file)=>{
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend =()=>{
        setProductImg(reader.result)
      };
    }else{
      setProductImg("");
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    dispatch(productsCreate({
      name,
      brand,
      price,
      description,
      image: productImg,
    }));

    if (createStatus === 'success') {
      toast.success('Producto creado exitosamente');
      navigate('/admin/products');
    }
  }

  return (  
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
      <h3>Crear Producto</h3>
      <input id="imgUpload" type="file" name="image" accept="image/*" onChange={handleProductImageUpload} required/> {/* agregue name="image" */}
      <select onChange={(e)=> setBrand(e.target.value)} required>
        <option value="">Seleccionar Marca</option>
        <option value="Remeras">Remeras</option>
        <option value="Buzos">Buzos</option>
        <option value="Gorras">Gorras</option>
        <option value="Reloj">Reloj</option>
        <option value="otros">Otros</option>
      </select>
      <input type="text" required placeholder="Nombre" onChange={(e)=> setName(e.target.value)} />
      <input type="number" required placeholder="precio" onChange={(e)=> setPrice(e.target.value)} />
      <input type="text" required placeholder="breve descripción" onChange={(e)=> setDescription(e.target.value)} />
      <PrimaryButton type="submit">
        {createStatus === "pending" ? "Submitting" : "Submit"}
      </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="error!" />
          </>
        ) : (
          <p>¡La vista previa de la imagen aparecerá aquí!</p>
        )
        }
      </ImagePreview>
      
    </StyledCreateProduct>
  )
}

export default CreateProduct


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
