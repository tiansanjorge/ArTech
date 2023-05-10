import Tag from "./Tag";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { BsFillCartFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const Item = ({ id, valor, img, nombre, categoria, tag, stock }) => {
  const navigate = useNavigate();
  const {addProduct} = useCartContext();
  const {addToFavorites} = useFavoritesContext();
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
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            addToFavorites({id, nombre, valor, categoria, tag, img, stock}, 1, "Negro")
          }}
        >
          Añadir a favoritos <BsHeartFill/>
        </button>
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            addProduct({id, nombre, valor, categoria, tag, img, stock}, 1, "Negro")
          }}
        >
          Añadir al carrito <BsFillCartFill />
        </button>
      </div>
    </div>
  );
};

export default Item;
