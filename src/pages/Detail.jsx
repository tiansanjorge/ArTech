import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { Loader } from "../components/Loader";
import Counter from "../components/Counter";

export const Detail = () => {
  const  { productId }  = useParams();
  const [product, setProduct] = useState({data: [], loading: true});

  useEffect(() => {
    setProduct({data: [], loading: true})
    getProduct(productId).then((info) => {
      setProduct({data: info, loading: false});
    });
  }, [productId]);


  return (

      
      <div className="row mx-0 my-2 text-center align-items-center justify-content-center">
        {product.loading ? <Loader/> : null}
        <div className="col-3"><img className="img-fluid" src={product.data?.img} alt={product.data?.nombre} /></div>
        <div className="col-3">
          <div className="m">{product.data?.categoria}</div>
          <div className="mb-5"><b>{product.data?.nombre}</b></div>
          <div className="mb-5">${product.data?.valor}</div>
          <Counter
          stock={product.data?.stock}
          onAdd={() => console.log("Agregando al carrito")}
        />
        </div>
      </div>

  );
};
