import { BsFillCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../api/orders";
import { updateManyProducts } from "../api/products";
import { useCartContext } from "../context/cartContext";
import Swal from 'sweetalert2'




export const Cart = () => {
  const navigate = useNavigate()
  const emailRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegEx = /^\+?[1-9][0-9]{7,14}$/;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderState] = useState("generated");
  const [mailError, setMailError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  
  let newdate = year + "/" + month + "/" + day;

  const validateRegEx = (value, regEx) => {
    return String(value)
      .toLowerCase()
      .match(regEx);
  };

  const validateInput = (value, type) => {

    switch (type) {

      case "email":


        if (validateRegEx(value, emailRegEx)) {
          setEmail(value)
          setMailError("")
        } else {
          value && setMailError("email Invalido")
        }
        break;
      default:

        if (validateRegEx(value, phoneRegEx)) {
          setPhone(value)
          setPhoneError("")
        } else {
          setPhoneError("Telefono invalido")
        }

    };
  }

  const checkEmail = (emailToCheck) => {

    if ((email !== emailToCheck) && !mailError) {

      setMailError("Los correos no coinciden")
    }
    else {
      mailError === "Los correos no coinciden" && setMailError()
      setEmail(email)
    }
    console.log("email", email, "emailtocheck", emailToCheck)

  }

  const { getTotal, cart, emptyCart } = useCartContext();

  if (cart.length <= 0) return (
    <div className="d-flex justify-content-evenly">
      <div className="text-center m-auto" style={{ fontWeight: 600 }}><BsFillCartFill />    <br /> Su carrito esta vacío</div>
    </div>
  );

  const createOrder = async (e) => {
    e.preventDefault();
    const items = cart.map(({ id, nombre, qty, valor }) => ({
      id,
      nombre,
      qty,
      valor,
    }));

    let itemsAlert = ""

    for (let i = 0; i < items.length; i++) {
      itemsAlert += "<b>Item:</b> " + items[i].nombre + "<br><b>Cantidad:</b> " + items[i].qty +" <b>Valor Unidad:</b> $" + items[i].valor + "<br><br>" ;
      console.log(itemsAlert)
    }

    const order = {
      buyer: { name, phone, email },
      items,
      fecha: newdate,
      estado: { orderState },
      total: getTotal(),
    };
    const { buyer, fecha, total } = order

    const id = await addOrder(order);

    await updateManyProducts(items);
    emptyCart();

    Swal.fire(
      {
        title: "Pedido Realizado",
        html: `El id de su compra es <b>"${id}"</b> <br> Fecha: ${fecha}<br><br> <b>Detalle de compra:</b><br> <br> <b>Comprador:</b> ${buyer.name} <br><br> ${itemsAlert}<br> <b>Total: $${total}</b>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
  };

  return (

    <div className="w-75 m-auto my-5">
      <h2 className="text-center my-5"><BsFillCartFill /> Carrito <BsFillCartFill /> </h2>

      {cart.map((product) => (
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
        </div>
      ))}
      <span style={{
        marginBottom: 50,
        textAlign: "center",
        width: "70%",
        fontSize: 20,
      }} className="mx-auto">
        Total : <b><b>${getTotal()}</b></b>
      </span>
      <form style={{ display: "grid", gap: 10 }} className="mb-5" >
        <span>Nombre</span>
        <input
          style={{ border: "1px solid black", height: 40 }}
          onChange={(e) => setName(e.target.value)}
        />
        <span>Telefono</span>
        <input type={"phone"}
          style={{ border: "1px solid black", height: 40 }}
          onBlur={(e) => validateInput(e.target.value, "phone")}
        />
        <span>Email</span>
        <input type={"email"}
          style={{ border: "1px solid black", marginBottom: 15, height: 40 }}
          onBlur={(e) => validateInput(e.target.value, "email")}
        />
        <span>Confirmar Email</span>
        <input
          style={{ border: "1px solid black", marginBottom: 15, height: 40 }}
          onBlur={(e) => checkEmail(e.target.value)}
        />
        <input type="submit" value="Enviar" onClick={createOrder} />
      </form>

      <div>
        {mailError}
        <br />
        {phoneError}
      </div>

    </div>

  );
};
