import { BsFillCartFill } from "react-icons/bs";
import { useWishlistContext } from "../context/wishlistContext";
import { useCartContext } from "../context/cartContext";
import Counter from "../components/Counter";
import { getProduct } from "../api/products";

export const Wishlist = () => {

  const { wishlist, removeOfWishlist } = useWishlistContext();
  const { addProduct} = useCartContext();
  console.log(wishlist)



  return (

    <div className="w-75 m-auto my-5">
      <h2 className="text-center my-5">Wishlist</h2>
      {wishlist.map((product) => (
        <div key={product.id}
          style={{
            display: "flex",
            gap: 50,
            height: 100,
            alignItems: "center",
            width: "70%",
            justifyContent: "space-evenly",
          }} className="m-auto">
          <div>Producto : <b><b>{product.nombre}</b></b></div>
          <div>Valor unitario : <b><b>${product.valor}</b></b></div>
          <div>Cantidad : <b><b>{product.qty}</b></b></div>
          {/* <Counter
          stock={product.stock}
          onAdd={(qty) => {
            addProduct(product, qty);
          }}
          /> */}
          <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            addProduct(product, product.qty)
          }}
          ><BsFillCartFill /></button>
          <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            removeOfWishlist(product.id)
          }}
          >Eliminar de Wishlist</button>
        </div>
      ))}
      

    </div>

  );
};
