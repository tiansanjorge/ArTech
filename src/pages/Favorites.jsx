
import { BsStarFill } from "react-icons/bs";
import { useFavoritesContext } from "../context/favoritesContext";
import FavCounter from "../components/FavCounter";


export const Favorites = () => {

  const { favorites, removeOfFavorites, emptyFavorites } = useFavoritesContext();

  if (favorites.length <= 0) return (
    <div className="text-center mb-5">
      <h3 className="my-5"><BsStarFill/></h3>
      <div><b> No tienes productos en favoritos</b></div>
    </div>
  );

  return (

    <div className="minH col-lg-8 col-11 mx-auto">
      <h3 className=" text-center my-5 py-2 bg-lightblue rounded shadow-sm">Favoritos</h3>
      {favorites.map((product) => (
        <div key={product.id + product.color} >
          
          <div className="d-none d-md-flex text-center justify-content-evenly align-items-center py-3 px-2 rounded bg-yellow mb-2 shadow">
            <div className="h100"><img className="img-fluid h-100" src={product.img} alt="" /></div>
            <div className="w20"><b><b>{product.nombre}</b></b></div>
            <div className="px-1">Valor unidad:<br /> <b><b>${product.valor}</b></b></div>
            <div className="px-1">Color:<br /> <b><b>{product.color}</b></b></div>
            <FavCounter product={product}/>
            <button className="rounded-5 px-2 button2"
            onClick={(e) => {
              e.stopPropagation();
              removeOfFavorites(product.id, product.color);
            }}
            >Eliminar</button>
          </div>
          <div className="d-flex d-md-none flex-column justify-content-evenly py-3 rounded bg-yellow mb-2 text-center">
            <div className="d-flex justify-content-center">
              <div className="h100 pe-5"><img className="img-fluid h-100" src={product.img} alt="" /></div>
              <div className="pt-3"><b><b>{product.nombre}</b></b></div>
            </div>
            <div className="d-flex justify-content-evenly pt-3 text-center">
              <div>Valor unidad:<br /> <b><b>${product.valor}</b></b></div>
              <div>Color:<br /> <b><b>{product.color}</b></b></div>
              <FavCounter product={product}/>
              <button className="rounded-5 px-2 button2"
              onClick={(e) => {
                e.stopPropagation();
                removeOfFavorites(product.id, product.color);
              }}
              >Eliminar</button>
            </div>
          </div>
        </div>
      ))}
      <div className=" m-auto my-5 text-center ">
        <button className="rounded-5 px-4 shadow-sm"
          onClick={() => emptyFavorites()}
          >Vaciar Favoritos</button>
      </div>
      

    </div>

  );
};
