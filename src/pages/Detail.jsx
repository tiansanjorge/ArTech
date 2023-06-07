import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import Counter from "../components/Counter";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { Loader } from "../components/Loader";

export const Detail = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  
  // el param "productId" es sacado de la ruta (app.js) y fue brindado por el componente "Item.jsx"
  const  { productId }  = useParams();
  const { addProduct } = useCartContext();
  const {addToFavorites} = useFavoritesContext();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    }).catch((e) => navigate("/error")) 
  }, [productId]);

  const handleAdd = (qty, color) => {
    addProduct(product, qty, color);
  
  };

  const favoritesAdd = (qty, color) => {
    addToFavorites(product, qty, color);
  };

  return (

    
      <div className="row">
        
        {loading ? <Loader /> : 
        <div className="row mx-0 mb-2 text-center align-items-center">
          <div className="my-3">
            <h2><b> Llevando 3 productos iguales : 25% de descuento en una unidad</b></h2>
            <h4>* Promoción no acumulable en un mismo producto</h4>
          </div>  
          <div className="col-6"><img className="img-fluid" src={product?.img} alt={product?.nombre} /></div>
          <div className="col-6">
            <div className="mb-5"><b>{product?.nombre}</b></div>
            <p className="mb-5">{product?.descripcion}</p>
            <div className="mb-5">${product?.valor}</div>  
            <div className="mb-3">
            Quedan {product?.stock} disponibles
            </div>        
            <Counter
            nombre={product?.nombre}
            stock={product?.stock}
            onAdd={handleAdd}
            favoritesAdd={favoritesAdd}
            />
          </div>
        </div>  }
        
        
      </div>

  );
};
