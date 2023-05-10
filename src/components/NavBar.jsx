import React, {useState} from "react";
import { BsFillCartFill, BsHeartFill, BsFillCaretDownFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { useAuthContext } from '../context/authContext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";



const links = ["allProducts","Celulares", "Televisores", ];

export const NavBar = () => {
  const { getCartQty } = useCartContext();
  const { getFavoritesQty } = useFavoritesContext();

  const { user } = useAuthContext();

  const [dropdown, SetDropdown] =useState(false);

  const toggleDropdown = () => {
    SetDropdown(!dropdown)
  }

  return (
    <header className="header px-5">
      <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
        <h2>ArgenTech</h2>
      </Link>
      <Dropdown  isOpen={dropdown} toggle={toggleDropdown}>
        <DropdownToggle className="bg-success border-0" style={{ fontSize: 14}}>
          Categorías <BsFillCaretDownFill/>
        </DropdownToggle>
        <DropdownMenu>
          {links.map((elemento) => {
            return (
              <DropdownItem key={elemento}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "#1684a3" : "#000",
                    textDecoration: "none",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: isActive ? 12 : 10,
                  })
                  }
                  to={`/category/${elemento}`}>
                  <div>
                    {elemento === "allProducts" ? "Todos los Productos" : elemento }
                  </div>
                </NavLink>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <div className='justify-between bg-gray-200 w-full p-4'>
        {user?.displayName ? <Link className="m-auto" style={{ color: "#fff", textDecoration: "none"}} to="/account">Mi cuenta</Link> : <Link style={{ color: "#fff", textDecoration: "none"}} to='/signin'>Iniciar Sesión</Link>  }
      </div>
      <div className='justify-between bg-gray-200 w-full'>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/orders">
          <span>Mis pedidos</span>
        </Link>
      </div>
      <div className="header__buttons" style={{ display: "flex", justifyContent:"space-around", width: "20%"}}>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/favorites">
          
          Favoritos <BsHeartFill/>
          <span className="m-auto" style={{ display: "flex", justifyContent:"space-around"}}>{getFavoritesQty()}</span>
          
        </Link>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/cart">
          
          Carrito <BsFillCartFill/>
          <span className="m-auto" style={{ display: "flex", justifyContent:"space-around"}}>{getCartQty()}</span>
          
        </Link>
      </div>
    </header>
  );
};
