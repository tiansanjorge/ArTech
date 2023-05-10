import Item from "./Item";
import { Loader } from "./Loader";


const ItemContainer = ({ products, loading }) => {

    return (
        <div className="row m-0 d-flex justify-content-evenly">
            <div className="col-8 text-center d-flex flex-column justify-content-around my-5">
                <h2><b> Llevando 3 productos iguales : 25% de descuento en una unidad</b></h2>
                <h4>* Promoción no acumulable en un mismo producto</h4>
            </div>
            <div className="col-12 products">
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
                            stock={producto.stock}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ItemContainer;