import {BsFillCartFill} from "react-icons/bs";
import { useCartContext } from "../context/cartContext";

// export const Cart = () => {
//   return (
//       <div className="align-self-center text-align-center flex-column mb-5"><BsFillCartFill/>Página en construcción!</div>
//   );
// };

export const Cart = () => {
  const { getTotal, cart } = useCartContext();
  return (
    <div>
      <BsFillCartFill/>
      {cart.map((product) => (
        <div key={product.id}>
          <div>Nombre : {product.nombre}</div>
          <div>Cantidad : {product.qty}</div>
        </div>
      ))}
      {getTotal()}
    </div>
  );
};