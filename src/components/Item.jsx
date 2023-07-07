import Tag from "./Tag";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const Item = ({ id, valor, img, nombre, categoria, tag, stock }) => {
  const navigate = useNavigate();
  const {cart, addProduct} = useCartContext();
  const {favorites, addToFavorites} = useFavoritesContext();

  const [cartDisabled, setCartDisabled] = useState(false);

  const counterCartCheck = () => {
    const itemsSameName = cart.filter(item => item.nombre == nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0);

    if ( totalQty >= stock) {
      setCartDisabled(true)
    } else {
      setCartDisabled(false)
    }
  }

  useEffect(() => {
    counterCartCheck();
  }, []);


  const handleAddToFavorites = () => {
      addToFavorites({ id, nombre, valor, categoria, tag, img, stock }, 1, "Negro");
  };

  const handleAddToCart = () => {
    counterCartCheck();
    if (!cartDisabled) {
      addProduct({ id, nombre, valor, categoria, tag, img, stock }, 1, "Negro");
      if (stock - 1 === 0) {
        setCartDisabled(true);
      }
    }
    
  };


  return (
    <div className="card shadow-lg justify-content-end" onClick={() =>navigate(`/product/${id}`)}>
      <div className="card__top m-auto">
        <img className="img-fluid rounded p-4" src={img} alt="Producto ArTech" />
      </div>
      <span className="card__price rounded">${valor}</span>
      <Tag titulo={tag} />
      <div className="d-flex flex-column bg-blue rounded-bottom">
        <span className="card__name text-center pt-2 size16"><b>{nombre}</b></span>
        <div className="d-flex justify-content-around my-3">
          <button  className="px-3 rounded-5 border-0 hover1"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFavorites();
            }}
          >
            A Favoritos <BsStarFill />
          </button>
          <button disabled={cartDisabled}  className={`px-3 rounded-5 border-0 ${cartDisabled ? ' bg-secondary' : 'hover1'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            {cartDisabled ? "sin stock" : "Al Carrito "}
            {!cartDisabled && <BsFillCartPlusFill />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
