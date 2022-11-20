import ItemContainer from "../components/ItemContainer";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProducts([]);
        setLoading(true);
        getProducts()
            .then((items) => {
                setProducts(items);
                setLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);

    const onAdd = (producto) => {
        console.log(producto);
    };
    return (
        <main className="content">
            <ItemContainer
                products={products}
                loading={loading}
                onAdd={onAdd} />
        </main>
    );
};
