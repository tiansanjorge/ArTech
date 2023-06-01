import Item from "./Item";
import { Loader } from "./Loader";
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { BsFillCaretDownFill } from "react-icons/bs";


const ItemContainer = ({ products, loading }) => {

    const [dropdown, setDropdown] =useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const pricesHighLow = (a, b) => {
        return b - a;
    };

    const sortLowHigh = () =>products.sort((a, b) => pricesLowHigh(a.valor, b.valor));

    const sortHighLow = () =>products.sort((a, b) => pricesHighLow(a.valor, b.valor));

    const pricesLowHigh = (a, b) => {
        return a - b;
    };
    

    return (
        <div className="row text-center">
            {loading ? <Loader /> : 
            <div className="row m-0 d-flex justify-content-evenly">
                <div className="col-8 text-center d-flex flex-column justify-content-around my-5">
                    <h2><b> Llevando 3 productos iguales : 25% de descuento en una unidad</b></h2>
                    <h4>* Promoción no acumulable en un mismo producto</h4>
                </div>
                <Dropdown className="my-5"  isOpen={dropdown} toggle={toggleDropdown}>
                    <DropdownToggle className="bg-success border-0 " style={{ fontSize: 14}}>
                    Ordenar<BsFillCaretDownFill/>
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem>
                            <button onClick={() => sortLowHigh()}>Precio menor a mayor</button> 
                        </DropdownItem>
                        <DropdownItem>
                            <button onClick={() => sortHighLow()}>Precio mayor a menor</button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className="col-12 products">
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
            </div>}
            
        </div>
    );
};

export default ItemContainer;