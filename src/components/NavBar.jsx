import { BsFillCartFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";


const links = ["Celulares", "Televisores"];

export const NavBar = () => {
  const { cart, getCartQty } = useCartContext();
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
      <div className="header__buttons">
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/cart">
          
          <BsFillCartFill /> Carrito <BsFillCartFill />
          <span className="m-auto">{getCartQty()}</span>
          
        </Link>
      </div>
    </header>
  );
};
