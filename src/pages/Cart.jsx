import { BsFillCartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { addOrder } from "../api/orders";
import { updateManyProducts } from "../api/products";
import { useCartContext } from "../context/cartContext";
import Swal from 'sweetalert2'

export const Cart = () => {

  // Los RegEx (o expresiones regulares) permiten en este caso nos permiten validar que un telefono o email sea valido (que tenga "@" y luego tenga algo escrito antes de un ".com", etc.)
  const emailRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // (que solo permita numeros, mas de 7 numeros y menos de 15, etc. )
    const phoneRegEx = /^\+?[1-9][0-9]{7,14}$/;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState("");

  const [orderState] = useState("generated");
  // const [orderInfo, setOrderInfo] = useState([]);

  const [phoneError, setPhoneError] = useState("")
  const [mailError, setMailError] = useState("")
  const [checkMailError, setCheckMailError] = useState("");
  
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  
  let newdate = day + "/" + month + "/" + year;

  // Función que será llamada en la siguiente funcion "validateInput" para validar datos con los RegEX declarados previamente
  const validateRegEx = (value, regEx) => {
    return String(value)
      .toLowerCase()
      .match(regEx);
  };

  // Funcion para validar los datos de los inputs mail y telefono
  // le pasamos el parametro "value" que provendrá del evento onBlur del input y el type que sera declarado como "email" o "phone"
  const validateInput = (value, type) => {
    checkEmail("", value)
    switch (type) {

      case "email":
        // Si la validación con el RegEx matchea y es correcto...
        if (validateRegEx(value, emailRegEx)) {
          setEmail(value)
          setMailError("")
        } 
        // Si la funcion "validateRegEx" nos devuelve un valor falso...
        else {
          value && setMailError("email Invalido")
        }
        break;
      
      // Este es el caso del type "phone", pero es lo mismo dejar default ya que son solo 2 types. 
      default:
        if (validateRegEx(value, phoneRegEx)) {
          setPhone(value)
          setPhoneError("")
        } else {
          setPhoneError("Telefono invalido")
        }

    };
  }

  // Chequear si los mails de ambos inputs de mails coinciden
  const checkEmail = (from, emailToCheck) => {
    setCheckMailError("");
    if (email === emailToCheck && from === "checkInput" ) setCheckMail(emailToCheck);
    if (emailToCheck !== checkMail && checkMail) setCheckMailError("Los correos no coinciden")

    // console.log("email", email, "emailtocheck", emailToCheck)
  }

  const { getTotal, cart, discount, emptyCart, removeProduct } = useCartContext();

  
  if (cart.length <= 0) return (
    <div className="d-flex justify-content-evenly">
      <div className="text-center m-auto" style={{ fontWeight: 600 }}><BsFillCartFill /><br /> Su carrito esta vacío</div>
    </div>
  );

  let discountSpan = ""
  if (discount){
    discountSpan =<span>Descuento del 25% en la 3era misma unidad aplicado</span>}
  else{
    discountSpan =<span>No hay descuentos aplicados</span>}

  // Creamos la orden en firebase

  const createOrder = async (e) => {
    // Como esta función esta siendo llamada desde el boton tipo "submit" del form, el "e.preventDefault" esta previniendo el comportamiento por default que tiene el submit, el cual es un "get" request a la URL por defecto. Pasando en limpio, estamos previniendo ese comportamiento indeseado y definiendo, con las funciones a continuación, que sucede cuando se clickea en submit .
    e.preventDefault();

    // Armamos un nuevo array con 4 propiedades de cada objeto del array "cart" para facilitar el llamado
    const items = cart.map(({ id, nombre, qty, valor, color }) => ({
      id,
      nombre,
      qty,
      valor,
      color
    }));

    let itemsAlert = ""

    // Recorremos el array items e incluimos en un string el mensaje que nos aparecerá en nuestra alerta cuando realicemos la orden
    for (let i = 0; i < items.length; i++) {
      itemsAlert += "<b>Item:</b> " + items[i].nombre + "<br><b>Cantidad:</b> " + items[i].qty +
      "<br><b>Color:</b> " + items[i].color +" <b>Valor Unidad:</b> $" + items[i].valor + "<br><br>" ;
    }

    // creamos la orden como un objeto
    const order = {
      buyer: { name, phone, email },
      items,
      fecha: newdate,
      estado: { orderState },
      total: getTotal(),
    };

    // desestructuramos ciertas propiedades de la orden para llamarlas con mas facilidad
    const { buyer, fecha, total } = order

    // Agregamos la orden a la colección "orders" de firebase, y luego se nos retorna el "id" de la misma
    const id = await addOrder(order);

    // Actualizamos el stock de los productos en firebase
    await updateManyProducts(items);
    emptyCart();

    // Alerta de orden realizada
    Swal.fire(
      {
        title: "Pedido Realizado",
        html: `El id de su compra es <b>"${id}"</b> <br> Fecha: ${fecha}<br><br> <b>Detalle de compra:</b><br> <br> <b>Comprador:</b> ${buyer.name} <br><br> ${itemsAlert}<br> <b>Total: $${total}</b>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })

  };

  return (

    <div className=" m-5">
      <h2 className="text-center my-5"><BsFillCartFill /> Carrito <BsFillCartFill /> </h2>

      {cart.map((product) => (
        <div key={product.id}
          style={{
            display: "flex",
            gap: 50,
            height: 100,
            alignItems: "center",
            justifyContent: "space-evenly",
          }} className="m-auto">
          <div className="h-50"><img className="img-fluid h-100" src={product.img} alt="" /></div>
          <div>Producto : <b><b>{product.nombre}</b></b></div>
          <div>Valor unitario : <b><b>${product.valor}</b></b></div>
          <div>Cantidad : <b><b>{product.qty}</b></b></div>
          <div>Color : <b><b>{product.color}</b></b></div>
          <button className="border-5 rounded-5 bg-dark text-white"
          onClick={(e) => {
            e.stopPropagation();
            removeProduct(product.id, product.color)
          }}
          >Eliminar</button>
        </div>
      ))}
      <div className="mx-auto my-4">
      <span style={{
        marginBottom: 50,
        textAlign: "center",
        width: "70%",
        fontSize: 20,
      }}>
        {discountSpan} <br />
        Total : <b><b>${getTotal()}</b></b>
      </span>
      </div>
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
          onBlur={(e) => checkEmail("checkInput", e.target.value)}
        />
        <input type="submit" value="Enviar" onClick={createOrder} />
      </form>

      <div>
        {mailError}
        <br />
        {phoneError}
        <br />
        {checkMailError}
      </div>

    </div>

  );
};
