import { useState, useEffect } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useFavoritesContext } from "../context/favoritesContext";
import { useCartContext } from "../context/cartContext";
import { toast } from 'react-toastify';


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
            toastCart();
            removeOfFavorites(product.id, product.color);
            localStorage.setItem(`counter${product.id}`, "")
        } else {
            if (totalQty + contador > product.stock) {
            setError("Stock insuficiente");
            }
        }
    }

    const toastCart = () => toast.success('Producto agregado al Carrito', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    return (
        <div>
            <div className="text-danger mb-2">
                {Error}
            </div>
            <div className="d-flex flex-column flex-md-row">
                <div className="d-flex" >
                    <button className="button2 rounded-5 px-2 m-2" onClick={() => handleSubstract()}>-</button>
                    <span className="mx-2 my-auto">{contador}</span>
                    <button className="button2 rounded-5 px-2 m-2" onClick={() => handleAdd()}>+</button>
                </div>
                <div>
                    <button className="button4 rounded-5 ms-md-3 me-md-2 ms-xl-5"
                    onClick={() =>{counterCartCheck()}}
                    ><BsFillCartPlusFill className="m-2 size20" /></button>
                </div>
            </div>
        </div>
    );
};

export default FavCounter;
