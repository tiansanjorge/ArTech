import { BsFillCartFill } from "react-icons/bs";
import { useState, useEffect} from "react";
import { addOrder } from "../api/orders";
import { updateManyProducts } from "../api/products";
import { useCartContext } from "../context/cartContext";
import { useAuthContext } from '../context/authContext';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export const Cart = () => {

  const { getTotal, cart, discount, emptyCart, removeProduct} = useCartContext();
  const { user } = useAuthContext();

  // Este RegEx permite validar que un telefono solo permita numeros, mas de 7 y menos de 15)
  const phoneRegEx = /^\+?[1-9][0-9]{7,14}$/;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [inputPhone, setInputPhone] = useState("");
  const [inputName, setInputName] = useState("");
  
  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [stockError, setStockError] = useState("")

  const [orderState] = useState("generated");

  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newdate = day + "/" + month + "/" + year;

  // Establezco en la variable email el correo de la cuenta que inicio sesión
  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  // Valido el valor phone con el RegEx de telefono declarado previamente ("phoneRegEx")
  const validatePhone = (value) => {
    if (value === "") {
      setPhone(value);
      setPhoneError("");
    } else if (String(value).toLowerCase().match(phoneRegEx)) {
      setPhone(value);
      setPhoneError("");
    } else {
      setPhoneError("Teléfono inválido");
    }
  }

  
  // guardo en localStorage los valores de los inputs

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    const storedName = localStorage.getItem("name");
    
    if (storedPhone && storedPhone !== ""){

      setInputPhone(JSON.parse(storedPhone));
      validatePhone(inputPhone)

    }
    if (storedName) {
      setInputName(JSON.parse(storedName));
    }
  }, []);

  const storeInputPhone = (valor) => {setInputPhone(valor); localStorage.setItem("phone", JSON.stringify(valor))};
  const storeInputName = (valor) =>{setInputName(valor); localStorage.setItem("name", JSON.stringify(valor))};

  // Si el carrito está vació se muestra este mensaje
  if (cart.length <= 0) 
  return (
    <div className="d-flex justify-content-evenly">
      <div className="text-center my-5" style={{ fontWeight: 600 }}><BsFillCartFill /><br /><br /> Su carrito esta vacío</div>
    </div>
  );


  // Verifico la variable discount importada del cartContext y muestro el aviso de si se aplica o no
  let discountSpan = ""
  if (discount){
    discountSpan =<span className="text-success">Descuento del 25% en la 3era misma unidad aplicado</span>}
  else{
    discountSpan =<span className="text-danger">No hay descuentos aplicados</span>}

  // Filtra el cart a ver si algun item tiene mas cantidad del stock disponible en firebase.
  const noStockItems = cart.filter(item => item.qty>item.stock);


  // Creamos la orden en firebase
  const createOrder = async (e) => {
    // Como esta función esta siendo llamada desde el boton tipo "submit" del form, el "e.preventDefault" esta previniendo el comportamiento por default que tiene el submit, el cual es un "get" request a la URL por defecto. Pasando en limpio, estamos anulando ese comportamiento indeseado y definiendo, con las funciones a continuación, que sucede cuando se clickea en submit .
    e.preventDefault();

    // Antes de permitir que se envíe el formulario validamos que haya stock y que el nombre y telefono sean validos
    if(noStockItems.length > 0){
      let itemsWithoutStock = ""
      for (let item of noStockItems) {
      itemsWithoutStock += " - " + item.nombre
      }
      setStockError("No hay suficientes productos en stock para la cantidad elegida de " + itemsWithoutStock )
      return;
    }
    else if (!name){
      setNameError("Nombre inválido")
      return;
    }
    else if (!phone) {
      setNameError("")
      setPhoneError("Teléfono inválido")
      return;
    }

    setPhoneError("")

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
        html: `El id de su compra es <b>"${id}"</b><br>Fecha: ${fecha}<br><br><b>Detalle de compra:</b><br><br> <b>Comprador:</b> ${buyer.name} <br><br><b>Email:</b> ${buyer.email}<br><br> ${itemsAlert}<br><b>Total: $${total}</b> <br><br>Puedes visualizar este pedido en la sección "Mis pedidos"`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
  };

  return (

    <div className=" m-5">
      <h2 className="text-center my-5"><BsFillCartFill /> Carrito <BsFillCartFill /> </h2>

      {cart.map((product) => (
        <div key={product.id + product.color}
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

      <div className=" m-auto my-5 text-center">
        <button className="border-5 rounded-5 bg-dark text-white"
          onClick={() => emptyCart()}
          >Vaciar carrito</button>
      </div>

      {email ?
      (<div>
        
        <form style={{ display: "grid", gap: 10 }} className="my-5" >
          <span className="text-center col-12" >Estas realizando el pedido con el email de tu cuenta <br /><br /><b> {email} </b></span>

          <div className="text-danger">
            {stockError}
            <br />
            {nameError}
            <br />
            {phoneError}
          </div>
          <span>Nombre y apellido</span>
          <input
            style={{ border: "1px solid black", height: 40 }}
            onChange={(e) => {setName(e.target.value); storeInputName(e.target.value)}}
            onBlur={(e) => {storeInputName(e.target.value)}}
            defaultValue={inputName}
          />
          <span>Teléfono</span>
          <input style={{ border: "1px solid black", height: 40 }} 
          onChange={(e) => {validatePhone(e.target.value); storeInputPhone(e.target.value)}}
          onBlur={(e) => {storeInputPhone(e.target.value)}}
          defaultValue={inputPhone}/>

          <input type="submit" value="Realizar Pedido" onClick={createOrder} /> 
        </form>

        
      </div>)
      :
      (<div className="text-center col-12 mt-5"><div className="py-5">Debes iniciar sesión con una cuenta para realizar un pedido</div> 
        <Link className="p-3" style={{ color: "#000", textDecoration: "none", borderStyle: "solid", borderRadius: 5}} to='/signin'><b> Iniciar Sesión </b></Link>
      </div>)
      }

    </div>

  );
};
