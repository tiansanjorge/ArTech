import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import Counter from "../components/Counter";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { Loader } from "../components/Loader";
import BannerDiscount from "../components/BannerDiscount";

export const Detail = () => {
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
    })
  }, [productId]);

  const handleAdd = (qty, color) => {
    addProduct(product, qty, color);
  };

  const favoritesAdd = (qty, color) => {
    addToFavorites(product, qty, color);
  };

  return (

    
      <div className="row minH ">
        
        {loading ? <Loader /> : 
        <div className="row mx-0 mb-5 text-center align-items-center ">
          <BannerDiscount></BannerDiscount>  
          <div className="col-11 d-lg-flex mt-3 mx-auto">
            <div className="col-lg-6 col-md-8 col-11 mx-auto"><img className="img-fluid p-5" src={product?.img} alt={product?.nombre} /></div>
            <div className="col-lg-6 col-md-8 col-11 text-center m-auto ">
              <div className="mb-5 text-blue size20"><b>{product?.nombre}</b></div>
              <p className="mb-5 mx-5">{product?.descripcion}</p>
              <p className="mb-5 bg-yellow rounded d-inline-block mx-auto px-2 shadow-sm">${product?.valor}</p>  
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
          </div>
        </div>  }
        
        
      </div>

  );
};
