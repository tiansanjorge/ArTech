import Tag from "./Tag";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useWishlistContext } from "../context/wishlistContext";

const Item = ({ id, valor, img, nombre, categoria, tag }) => {
  const navigate = useNavigate();
  const {addProduct} = useCartContext();
  const {addToWishlist} = useWishlistContext();
  return (
    <div className="card" onClick={() =>navigate(`/product/${id}`)}>
      <div className="card__top">
        <img src={img} alt="" />
        <span className="card__price">{valor}</span>
      </div>
      <div className="card__content">
        <span className="card__name">{nombre}</span>
        <span className="card__category">{categoria}</span>
        <Tag titulo={tag} />
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist({id, nombre, valor, categoria, tag, img}, 1)
          }}
        >
          Añadir a WishList
        </button>
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            addProduct({id, nombre, valor, categoria, tag, img}, 1)
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default Item;
