import Tag from "./Tag";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsStarFill  } from "react-icons/bs";
import { toast } from 'react-toastify';

const Item = ({ id, valor, img, nombre, categoria, tag, stock }) => {
  const navigate = useNavigate();
  const {cart, addProduct} = useCartContext();
  const {favorites, addToFavorites} = useFavoritesContext();

  const [cartDisabled, setCartDisabled] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [showFavAnimation, setShowFavAnimation] = useState(false);

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
    toastFav();
    setShowFavAnimation(true);
  };

  const handleAddToCart = () => {
    counterCartCheck();
    if (!cartDisabled) {
      addProduct({ id, nombre, valor, categoria, tag, img, stock }, 1, "Negro");
      toastCart();
      if (stock - 1 === 0) {
        setCartDisabled(true);
      }
      setShowCartAnimation(true);
    }
  };

  const handleCartAnimationEnd = () => {
    setShowCartAnimation(false);
  };

  const handleFavAnimationEnd = () => {
    setShowFavAnimation(false);
  };

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

  const toastFav = () => toast.success('Producto agregado a Favoritos', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    icon: <BsStarFill/>
    });

  return (
    <div className="card shadow-lg justify-content-end" onClick={() =>navigate(`/product/${id}`)}>
      <div className="card__top m-auto">
        <img className="img-fluid rounded p-4" src={img} alt="Producto ArTech" />
      </div>
      <span className="card__price rounded">${valor}</span>
      <Tag titulo={tag} />
      <div className="d-flex flex-column bg-blue rounded-bottom">
        <span className="card__name text-center pt-2 size16"><b>{nombre}</b></span>
        <div className="d-flex justify-content-center my-3">
          <button disabled={cartDisabled}  className={`px-3 rounded-5 border-0 me-5 ${cartDisabled ? ' bg-secondary' : 'hover1'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            {cartDisabled ? "sin stock" : "Añadir "}
            {!cartDisabled && <BsFillCartPlusFill className="mb-1"/>}
            {showCartAnimation && (
            <div className="addAnimation" onAnimationEnd={handleCartAnimationEnd}>
              <BsFillCartPlusFill size={28}/>
            </div>
          )}
        
          </button>
          <button  className="rounded-5 border-0 hover1 "
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFavorites();
            }}
          >
            <BsStarFill className="mb-1"/>{showFavAnimation && (
            <div className="addAnimation2" onAnimationEnd={handleFavAnimationEnd}>
              <BsStarFill size={20}/>
            </div>
            )}
          </button>
          
        </div>
      </div>
      {/* <ToastContainer transition={Bounce}/> */}
    </div>
  );
};

export default Item;
