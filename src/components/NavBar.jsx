import { BsFillCartFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useWishlistContext } from "../context/wishlistContext";


const links = ["Celulares", "Televisores"];

export const NavBar = () => {
  const { getCartQty } = useCartContext();
  const { getWishlistQty } = useWishlistContext();
  return (
    <header className="header px-5">
      <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
        <h2>ArgenTech</h2>
      </Link>
      <div className="header__nav">
        {links.map((elemento) => {
          return (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#fff", textDecoration: "none"
              })
              }
              to={`/category/${elemento}`} key={elemento}>
              {elemento}
            </NavLink>
          );
        })}
      </div>
      <div className="header__buttons" style={{ display: "flex", justifyContent:"space-around", width: "20%"}}>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/wishlist">
          
          Wishlist
          <span className="m-auto" style={{ display: "flex", justifyContent:"space-around"}}>{getWishlistQty()}</span>
          
        </Link>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/cart">
          
          Carrito <BsFillCartFill/>
          <span className="m-auto" style={{ display: "flex", justifyContent:"space-around"}}>{getCartQty()}</span>
          
        </Link>
      </div>
    </header>
  );
};
