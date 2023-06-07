import { useState, useEffect } from "react";
import Button from "./Button";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useFavoritesContext } from "../context/favoritesContext";
import { useCartContext } from "../context/cartContext";

const FavCounter = ({ product }) => {

    const [contador, setContador] = useState(product.qty);
    const [Error, setError] = useState("");

    const { addProduct, cart } = useCartContext();
    const { addToFavorites, removeOfFavorites, favorites } = useFavoritesContext();

    const handleAdd = () => {
        if (contador < product.stock) {
            setContador(contador+1);
            addToFavorites(product, 1, product.color )
        }
    };

    const handleSubstract = () => {
        if (contador > 0){
            setContador(contador - 1)
            addToFavorites(product, -1, product.color )
        };
    };

    const counterCartCheck = () => {
        const itemsSameName = cart.filter(item => item.nombre == product.nombre)
        const qtyItemsSameName = itemsSameName.map(item => item.qty)
        const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0);
        
        if (contador && product.color && totalQty + contador <= product.stock) {
            setError("");
            addProduct(product, contador, product.color);
            removeOfFavorites(product.id, product.color);
            localStorage.setItem(`counter${product.id}`, "")
        } else {
            if (totalQty + contador > product.stock) {
            setError("Stock insuficiente");
            }
        }
    }

    return (
        <div>
            <div className="text-danger mb-2">
                {Error}
            </div>
            <div  className="d-flex">
                <div className="d-flex" >
                    <Button className="mx-4" onClick={() => handleSubstract()}>-</Button>
                    <span className="mx-2">{contador}</span>
                    <Button className="mx-4" onClick={() => handleAdd()}>+</Button>
                </div>
                <div>
                    <button className="border-5 rounded-5 bg-dark text-white ms-4"
                    onClick={() =>{counterCartCheck()}}
                        
                    ><BsFillCartPlusFill /></button>
                </div>
                
                
            </div>
        </div>
    );
};

export default FavCounter;
