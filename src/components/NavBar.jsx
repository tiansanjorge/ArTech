import React, {useState} from "react";
import { BsFillCartFill, BsStarFill, BsFillCaretDownFill, BsList } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { useAuthContext } from '../context/authContext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";


const links = ["allProducts","Celulares", "Televisores"];

export const NavBar = () => {
  const { getCartQty } = useCartContext();
  const { getFavoritesQty } = useFavoritesContext();
  const { user } = useAuthContext();

  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-100 py-4 px-5 col-12 d-flex justify-content-between align-items-center bg-blue">
      <Link className="text-decoration-none" to="/">
        <h2 className="text-dark"><b>Ar<span className="text-white">Tech</span> </b></h2>
      </Link>
      <div className="d-block d-md-none mxf-auto">
        <Dropdown isOpen={menuOpen} toggle={toggleMenu}>
          <DropdownToggle className="hover1 border-0">
            <span className="d-none d-sm-block"><BsList size={28}/></span>
            <span className="d-block d-sm-none"><BsList size={28}/></span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Categorías</DropdownItem>
            {links.map((elemento) => {
              return (
                <DropdownItem className="hover2 border-0" key={elemento}>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "#1684a3" : "#000",
                      textDecoration: "none",
                      fontWeight: isActive ? "700" : "500",
                      fontSize: isActive ? 14 : 12,
                    })}
                    to={`/category/${elemento}`}
                  >
                    <div>
                      {elemento === "allProducts" ? "Todos los Productos" : elemento }
                    </div>
                  </NavLink>
                </DropdownItem>
              );
            })}
            <DropdownItem divider />
            <DropdownItem className="hover2 text-decoration-none">
              {user?.displayName ? (
                <NavLink 
                style={({ isActive }) => ({
                  color: isActive ? "#1684a3" : "#000",
                  textDecoration: "none",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: isActive ? 14 : 12,
                })}
                to="/account">
                  <div>
                    Cuenta
                  </div>
                </NavLink>
              ) : (
                <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1684a3" : "#000",
                  textDecoration: "none",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: isActive ? 14 : 12,
                })} to="/signin">
                  <div>
                    Iniciar Sesión
                  </div>
                </NavLink>
              )}
            </DropdownItem>
            <DropdownItem className="hover2 text-decoration-none">
              <NavLink 
              style={({ isActive }) => ({
                color: isActive ? "#1684a3" : "#000",
                textDecoration: "none",
                fontWeight: isActive ? "700" : "500",
                fontSize: isActive ? 14 : 12,
              })}
              to="/orders">
                <div>
                  Pedidos
                </div>
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="col-md-6 col-xl-7 d-none d-md-flex justify-content-around">
        <Dropdown  isOpen={dropdown} toggle={toggleDropdown}>
          <DropdownToggle className="hover1 border-0">
            Categorías <BsFillCaretDownFill/>
          </DropdownToggle>
          <DropdownMenu>
            {links.map((elemento) => {
              return (
                <DropdownItem className="hover2 border-0" key={elemento}>
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "#1684a3" : "#000",
                      textDecoration: "none",
                      fontWeight: isActive ? "700" : "500",
                      fontSize: isActive ? 14 : 12,
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
        <div className=''>
          {user?.displayName ? <Link className=" hover3 text-decoration-none" to="/account">Cuenta</Link> : <Link className="hover3 text-decoration-none" to='/signin'>Iniciar Sesión</Link>  }
        </div>
        <div className=''>
          <Link className="text-decoration-none" to="/orders">
            <span className="hover3">Pedidos</span>
          </Link>
        </div>
      </div>
      <div className="col-3 d-flex justify-content-around py-3 rounded bg-yellow insetShadow">
        <Link className="hover5 text-decoration-none text-center" to="/favorites">
          <span className="d-none d-lg-block">Favoritos <BsStarFill/></span>
          <span className="d-none d-md-block d-lg-none ">Favoritos <br /><BsStarFill/></span>
          <span className="d-block d-md-none "><BsStarFill/></span>
          <span className="d-flex justify-content-around">{getFavoritesQty()}</span>
        </Link>
        <Link className="hover5 text-decoration-none text-center" to="/cart">
          <span className="d-none d-lg-block">Carrito <BsFillCartFill/></span>
          <span className="d-none d-md-block d-lg-none ">Carrito <br /><BsFillCartFill/></span>
          <span className="d-block d-md-none "><BsFillCartFill/></span>
          <span className="d-flex justify-content-around">{getCartQty()}</span>
        </Link>
      </div>
      
    </header>
  );
};
