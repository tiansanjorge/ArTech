import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import Counter from "../components/Counter";
import { useCartContext } from "../context/cartContext";

export const Detail = () => {
  const navigate = useNavigate()
  // el param "productId" es sacado de la ruta (app.js) y fue brindado por el componente "Item.jsx"
  const  { productId }  = useParams();
  const { addProduct } = useCartContext();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(productId).then((data) => {
      setProduct(data);
    }).catch(e => navigate("/error")) 
  }, [productId]);

  const handleAdd = (qty) => {
    addProduct(product, qty);
  };

  return (

      
      <div className="row mx-0 my-2 text-center align-items-center justify-content-center">
        <div className="col-3"><img className="img-fluid" src={product?.img} alt={product?.nombre} /></div>
        <div className="col-3">
          <div className="mb-5"><b>{product?.nombre}</b></div>
          <p className="mb-5">{product?.descripcion}</p>
          <div className="mb-5">${product?.valor}</div>  
          <div className="mb-5">
          Quedan {product?.stock} disponibles
          </div>        
          <Counter
          stock={product?.stock}
          onAdd={handleAdd}
        />
        </div>
      </div>

  );
};
