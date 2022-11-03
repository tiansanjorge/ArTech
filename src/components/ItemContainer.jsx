import { useEffect, useState } from "react";
import Item from "./Item";
import { getProducts } from "../api/products";
import { Loader } from "./Loader";
import {useParams} from "react-router-dom";

const ItemContainer = () => {
    
    const {categoryId} = useParams();
    console.log(useParams())
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProductos([])
        setLoading(true);
        getProducts(categoryId)
            .then((items) => 
                {setProductos(items); 
                setLoading(false);
            })
    }, [categoryId]);

    return (
        <div className="row m-0 d-flex justify-content-evenly">
            <div className="col-8 products ">
                {loading ? <Loader /> : null}
                {productos.map((producto) => {
                    return (
                        <Item
                            key={producto.id}
                            id={producto.id}
                            nombre={producto.nombre}
                            tag={producto.tag}
                            valor={producto.valor}
                            img={producto.img}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ItemContainer;