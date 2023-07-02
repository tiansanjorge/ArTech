import Item from "./Item";
import BannerDiscount from "./BannerDiscount";
import { Loader } from "./Loader";
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { BsFillCaretDownFill } from "react-icons/bs";


const ItemContainer = ({ products, loading, category }) => {

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
        <div>
            {loading ? <Loader /> : 
            <div className="row m-0 d-flex justify-content-evenly text-center">
                {category ? <div className="col-12 p-0"><BannerDiscount></BannerDiscount><h2 className="col-11 ms-5 ps-3 mt-4 text-start text-dark">{category}</h2></div> : ""}
            
                <Dropdown className="col-11 my-3 text-end "  isOpen={dropdown} toggle={toggleDropdown}>
                    <DropdownToggle className="shadow-sm hover4 border-0">
                    Ordenar <BsFillCaretDownFill/>
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem className="hover2 border-0" onClick={() => sortLowHigh()}>
                            Precio: Menor a mayor
                        </DropdownItem>
                        <DropdownItem className="hover2 border-0"  onClick={() => sortHighLow()}>Precio: Mayor a menor
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className="col-11 products mb-5">
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