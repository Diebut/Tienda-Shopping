import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../Api/Api";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

const handleCheckout = () => {
  console.log("Checkout iniciado");
    axios.post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user.id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Verificar</button>
    </>
  );
};

export default PayButton;
