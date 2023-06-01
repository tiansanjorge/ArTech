import { useState } from "react";
import Button from "./Button";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useFavoritesContext } from "../context/favoritesContext";

const FavCounter = ({ onAdd, product }) => {

    const [contador, setContador] = useState(product.qty);

    const handleAdd = () => {
        if (contador < product.stock) {
            setContador(contador + 1);
        }
    };

    const handleSubstract = () => {
        if (contador > 0) setContador(contador - 1);
    };

    const { removeOfFavorites } = useFavoritesContext();

    return (
        <div  className="d-flex">
            <div className="d-flex" >
                <Button className="mx-4" onClick={() => handleSubstract()}>-</Button>
                <span className="mx-2">{contador}</span>
                <Button className="mx-4" onClick={() => handleAdd()}>+</Button>
            </div>
            <div>
                <button className="border-5 rounded-5 bg-dark text-white ms-4"
                onClick={() => {onAdd(product, contador, product.color);
                    removeOfFavorites(product.id, product.color)}}
                ><BsFillCartPlusFill /></button>
            </div>
            
        </div>
    );
};

export default FavCounter;
