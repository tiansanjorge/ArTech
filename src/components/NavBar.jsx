import React, {useState} from "react";
import { BsFillCartFill } from "react-icons/bs";
import { BsMagic } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useWishlistContext } from "../context/wishlistContext";
import { useAuthContext } from '../context/authContext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";



const links = ["Celulares", "Televisores"];

export const NavBar = () => {
  const { getCartQty } = useCartContext();
  const { getWishlistQty } = useWishlistContext();

  const { user, logOut } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  const [dropdown, SetDropdown] =useState(false);

  const toggleDropdown = () => {
    SetDropdown(!dropdown)
  }

  return (
    <header className="header px-5">
      <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
        <h2>ArgenTech</h2>
      </Link>
      <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
        <DropdownToggle>
          Categorías
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#fff", textDecoration: "none"
              })
              }
              to={`/`} >
              Todos los productos
            </NavLink>
          </DropdownItem>
          {links.map((elemento) => {
            return (
              <DropdownItem key={elemento}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "#FFF" : "#000", textDecoration: "none"
                  })
                  }
                  to={`/category/${elemento}`} >
                  {elemento}
                </NavLink>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <div className='flex justify-between bg-gray-200 w-full p-4'>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/orders">
          <span>Ordenes</span>
        </Link>
      </div>
      <div className='flex justify-between bg-gray-200 w-full p-4'>
        {user?.displayName ? <button onClick={handleSignOut}>Logout</button> : <Link to='/signin'>Sign in</Link>}
      </div>
      <div className="header__buttons" style={{ display: "flex", justifyContent:"space-around", width: "20%"}}>
        <Link style={{ color: "#fff", textDecoration: "none"}} to="/wishlist">
          
          Wishlist <BsMagic/>
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
