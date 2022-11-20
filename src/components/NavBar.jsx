import { BsFillCartFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";


const links = ["Celulares", "Televisores"];

export const NavBar = () => {
  const { cart, getCartQty } = useCartContext();
  console.log({ cart });
  return (
    <header className="header">
      <Link style={{ color: "black", textDecoration: "none" }} to="/">
        <h2>ArgenTech</h2>
      </Link>
      <div className="header__nav">
        {links.map((elemento) => {
          return (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#1684a3" : "black", textDecoration: "none"
              })
              }
              to={`/category/${elemento}`} key={elemento}>
              {elemento}
            </NavLink>
          );
        })}
      </div>
      <div className="header__buttons">
        <Link style={{ color: "black", textDecoration: "none" }} to="/cart">
          <BsFillCartFill /> Carrito <BsFillCartFill />
          <span className="">{getCartQty()}</span>
        </Link>
      </div>
    </header>
  );
};
