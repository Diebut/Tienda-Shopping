import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PrimaryButton } from "./CommonStyle";
import { productsEdit } from "../Products/ProductsSlice";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useParams
import { url } from "../Api/Api";

export default function EditProduct({ porId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, editStatus } = useSelector((state) => state.products);

  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    transformFileData(file);
  };

  const transformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      productsEdit({
        productImg,
        product: {
          /* ...currentProd,
          name: name, */
          id: currentProd.id,
          image: productImg || currentProd.image,
          brand: brand,
          price: price,
          description: description,
        },
      })
    );
    if (editStatus === 'success') {
      toast.info('Producto editado exitosamente');
      navigate('/admin/products');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (items && items.length > 0) { // Verifica si items no está vacío
      let selectedProd = items.find((item) => item.id === porId);

      console.log(selectedProd); // Agrega esta línea para verificar
      
      if (selectedProd) {
        setCurrentProd(selectedProd);
        setPreviewImg(selectedProd.image?.url);
        setProductImg("");
        setBrand(selectedProd.brand);
        setName(selectedProd.name);
        setPrice(selectedProd.price);
        setDescription(selectedProd.description);
      }
    } else {
      console.error("No items found"); 
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Edit onClick={handleClickOpen}>Editar</Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Editar Producto</h3>
              <input
                id="imgUpload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleProductImageUpload}
              />
              <select
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required
              >
                <option value="">Seleccionar Marca</option>
                <option value="Remeras">Remeras</option>
                <option value="Buzos">Buzos</option>
                <option value="Gorras">Gorras</option>
                <option value="Reloj">Reloj</option>
                <option value="otros">Otros</option>
              </select>
              <input
                type="text"
                required
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="breve descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <PrimaryButton type="submit">
                {editStatus === "pending" ? "submitting" : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <img src={previewImg} alt="error!" />
              ) : (
                <p>¡La vista previa de la imagen aparecerá aquí!</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

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

const StyledEditProduct = styled.div`
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
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
