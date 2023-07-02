import ItemContainer from "../components/ItemContainer";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/products";

export const Category = () => {
  // el param "categoryId" es sacado de la ruta (app.js) y fue brindado por el componente "NavBar.jsx"
  const { categoryId } = useParams();
  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductos([])
    setLoading(true);
    getProducts(categoryId)
    // el parametro que usa el ".then((x) => ..." es lo que devuelve la promise resuelta
      .then((items) => {
        setProductos(items);
        setLoading(false);
      })
  }, [categoryId]);
  return (
    <main className="pb-5">

      <ItemContainer products={products} loading={loading} category={categoryId}/>
    </main>
  );
};
