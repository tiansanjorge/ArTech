import Tag from "./Tag";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { BsFillCartFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const Item = ({ id, valor, img, nombre, categoria, tag, stock }) => {
  const navigate = useNavigate();
  const {cart, addProduct} = useCartContext();
  const {favorites, addToFavorites} = useFavoritesContext();

  const [cartDisabled, setCartDisabled] = useState(false);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);

  const counterCartCheck = () => {
    const itemsSameName = cart.filter(item => item.nombre == nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0) + 1;

    if ( totalQty >= stock) {
      setCartDisabled(true)
    } else {
      setCartDisabled(false)
    }
  }

  useEffect(() => {
    counterCartCheck();
  }, []);


  const counterFavoriteCheck = () => {
    const itemsSameName = favorites.filter(item => item.nombre == nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0) +1;

    if ( totalQty >= stock) {
      setFavoriteDisabled(true)
    } else {
      setFavoriteDisabled(false)
    }
  }

  useEffect(() => {
    counterFavoriteCheck();
  }, []);


  const handleAddToFavorites = () => {
    counterFavoriteCheck();
    if (!favoriteDisabled) {
      addToFavorites({ id, nombre, valor, categoria, tag, img, stock }, 1, "Negro");
    }
  };

  const handleAddToCart = () => {
    counterCartCheck();
    if (!cartDisabled) {
      addProduct({ id, nombre, valor, categoria, tag, img, stock }, 1, "Negro");
    }
  };


  return (
    <div className="card" onClick={() =>navigate(`/product/${id}`)}>
      <div className="card__top">
        <img src={img} alt="Producto Argentech" />
        <span className="card__price">{valor}</span>
      </div>
      <div className="card__content">
        <span className="card__name">{nombre}</span>
        <span className="card__category">{categoria}</span>
        <Tag titulo={tag} />
        <button disabled={favoriteDisabled} className='border-5 rounded-5 bg-dark text-white'
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites();
          }}
        >
          {favoriteDisabled ? "No hay stock" : "Añadir a favoritos "}
          {!favoriteDisabled && <BsHeartFill />}
        </button>
        <button disabled={cartDisabled}  className='border-5 rounded-5 text-white bg-dark' 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          {cartDisabled ? "No hay stock" : "Añadir al carrito "}
          {!cartDisabled && <BsFillCartFill />}
        </button>
      </div>
    </div>
  );
};

export default Item;
