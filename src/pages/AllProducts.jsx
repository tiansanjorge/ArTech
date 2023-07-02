import ItemContainer from "../components/ItemContainer";
import BannerDiscount from "../components/BannerDiscount";
import { useEffect, useState } from "react";
import { getProducts} from "../api/products";

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProducts([]);
        setLoading(true);
        getProducts()
        // el parametro que usa el ".then((x) => ..." es lo que devuelve la promise resuelta
            .then((items) => {
                setProducts(items);
                setLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <main className="row m-0 d-flex justify-content-evenly text-center">
            <BannerDiscount></BannerDiscount>
            <h2 className="col-11 ms-4 mt-2 text-start text-dark">Todos los Productos</h2>
            <ItemContainer
                products={products}
                loading={loading}
                />
        </main>
    );
};
