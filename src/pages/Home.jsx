import ItemContainer from "../components/ItemContainer";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ImageSlider from "../components/ImageSlider";
import BannerDiscount from "../components/BannerDiscount";


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

    const slides = [
        {url:"/img/celuH1.jpg", title: "Artech • Tecnología al Alcance"},
        {url:"/img/celuH2.jpg", title: "Celulares en Artech", href:"/category/Celulares"},
        {url:"/img/tvH1.jpg", title: "Televisores en Artech", href:"/category/Televisores"},
    ]

    return (
        <main className="row m-0 d-flex justify-content-evenly text-center">

            <ImageSlider loading={loading} slides={slides}></ImageSlider>
            {loading ? "" : <BannerDiscount></BannerDiscount>}
            
            <ItemContainer
                products={products}
                loading={loading}
                />
        </main>
    );
};

