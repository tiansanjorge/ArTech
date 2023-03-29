import Item from "./Item";
import { Loader } from "./Loader";


const ItemContainer = ({ products, loading }) => {

    return (
        <div className="row m-0 d-flex justify-content-evenly">
            <div className="col-8 products">
                {loading ? <Loader /> : null}
                {products.map((producto) => {
                    return (
                        <Item
                            key={producto.id}
                            id={producto.id}
                            nombre={producto.nombre}
                            categoria={producto.categoria}
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