import { BsFillCartFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../api/orders";
import { updateManyProducts } from "../api/products";
import Button from "../components/Button";
import { useCartContext } from "../context/cartContext";

export const Cart = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderState, setOrderState] = useState("generated");

  const { getTotal, cart, emptyCart } = useCartContext();

  // if (cart.length <= 0) return (
  //   <div>
  //     <BsFillCartFill />
  //     <div style={{ fontWeight: 600 }}>Su carrito esta vacío</div>
  //   </div>
  // );

  const createOrder = async () => {
    const items = cart.map(({ id, nombre, qty, valor }) => ({
      id,
      title: nombre,
      qty,
      price: valor,
    }));

    const order = {
      buyer: { name, phone, email },
      items,
      fecha: Date(),
      estado: { orderState },
      total: getTotal(),
    };

    const id = await addOrder(order);

    await updateManyProducts(items);

    alert("El numero de id de su compra es " + id)

    // emptyCart();

    // navigate("/cart")
  };

  return (

    <div>
      <BsFillCartFill />

      {cart.map((product) => (
        <div key={product.id}
          style={{
            display: "flex",
            gap: 50,
            height: 100,
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <div style={{ fontWeight: 600 }}>Nombre : {product.nombre}</div>
          <div>Cantidad : {product.qty}</div>
        </div>
      ))}
      <span style={{
        marginBottom: 50,
        textAlign: "right",
        width: "100%",
        fontSize: 20,
        fontWeight: 600,
      }}>
        ${getTotal()}
      </span>
      <form style={{ display: "grid", gap: 10 }}>
        <span>Nombre</span>
        <input
          style={{ border: "1px solid black", height: 40 }}
          onChange={(e) => setName(e.target.value)}
        />
        <span>Telefono</span>
        <input
          style={{ border: "1px solid black", height: 40 }}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span>Email</span>
        <input
          style={{ border: "1px solid black", marginBottom: 15, height: 40 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={createOrder}>Comprar</Button>
      </form>

    </div>

  );
};
