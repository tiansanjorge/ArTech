
import { BsHeartFill } from "react-icons/bs";
import { useFavoritesContext } from "../context/favoritesContext";
import FavCounter from "../components/FavCounter";


export const Favorites = () => {

  const { favorites, removeOfFavorites, emptyFavorites } = useFavoritesContext();

  if (favorites.length <= 0) return (
    <div className="text-center">
      <h2 className="text-center my-5"><BsHeartFill/></h2>
      <div className="text-center m-auto" style={{ fontWeight: 600 }}>No has agregado ningún producto a favoritos.</div>
    </div>
  );

  return (

    <div className=" m-auto my-5">
      <h2 className="text-center my-5"><BsHeartFill/> Favoritos <BsHeartFill/> </h2>
      {favorites.map((product) => (
        <div key={product.id}
          style={{
            display: "flex",
            gap: 50,
            height: 100,
            alignItems: "center",
            justifyContent: "space-evenly",
          }} className="m-auto">
          <div className="h-50"><img className="img-fluid h-100" src={product.img} alt="" /></div>
          <div>Producto: <b><b>{product.nombre}</b></b></div>
          <div>Valor unitario: <b><b>${product.valor}</b></b></div>
          <div>Color: <b><b>{product.color}</b></b></div>
          <FavCounter product={product}/>
          
          <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            removeOfFavorites(product.id, product.color);
          }}
          >Eliminar</button>
        </div>
      ))}
      <div className=" m-auto my-5 text-center">
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={() => emptyFavorites()}
          >Vaciar Favoritos</button>
      </div>
      

    </div>

  );
};
