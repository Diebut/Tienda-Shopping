import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addToCart } from "../Cart/CartSlice";
import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showArrows
            showIndicators
            className="carousel-container"
          >
            {data.map((product) => (
              <div key={product.id} className="carousel-item">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image?.url} alt={product.name} className="carousel-image" />
                  </Link>
                {/* <img src={product.image?.url} alt={product.name} className="carousel-image" /> */}
                <div className="carousel-content">
                  <h3 className="carousel-title">{product.name}</h3>
                  <p className="carousel-description">{product.description}</p>
                  <p className="carousel-price">${product.price}</p>
                  <button onClick={() => handleAddToCart(product)} className="carousel-button">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </>
      ) : status === "pending" ? (
        <p>Cargando...</p>
      ) : (
        <p>Ocurrió algo...</p>
      )}
    </div>
  );
};

export default Home;


/* import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { addToCart } from "../Cart/CartSlice";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../Products/ProductsApi";

const Home = () => {

  // const { items, status } = useSelector((state)=> state.products);
  const { items: data, status } = useSelector((state)=> state.products);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();
  
  const handleAddToCart = (product)=>{
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>Recien llegados</h2>
          <div className="products">  
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image?.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Cargar carrito
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Cargando...</p>
      ) : (
        <p>Ocurrio algo...</p>
      )}
    </div>
  );
};

export default Home; */

