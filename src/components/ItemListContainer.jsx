import Item from "./Item";
import { Loader } from "./Loader";


const ItemContainer = ({ products, loading, onAdd }) => {
    

    return (
        <div className="row m-0 d-flex justify-content-evenly">
            <div className="col-8 products ">
                {loading ? <Loader /> : null}
                {products.map((producto) => {
                    return (
                        <Item
                            key={producto.id}
                            id={producto.id}
                            nombre={producto.nombre}
                            tag={producto.tag}
                            valor={producto.valor}
                            img={producto.img}
                            onAdd={onAdd}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ItemContainer;