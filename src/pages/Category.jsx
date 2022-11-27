import ItemContainer from "../components/ItemListContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/products";

export const Category = () => {

  const { categoryId } = useParams();
  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductos([])
    setLoading(true);
    getProducts(categoryId)
      .then((items) => {
        setProductos(items);
        setLoading(false);
      })
  }, [categoryId]);
  return (
    <>
      <ItemContainer products={products} loading={loading}/>
    </>
  );
};
