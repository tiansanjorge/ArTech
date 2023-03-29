import ItemContainer from "../components/ItemListContainer";
import { useEffect, useState } from "react";
import { getProducts} from "../api/products";

export const Home = () => {
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
        <main className="content">
            <ItemContainer
                products={products}
                loading={loading}
                />
        </main>
    );
};

