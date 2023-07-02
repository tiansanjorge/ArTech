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

  const [phoneError, setPhoneError] = useState("")
  const [stockError, setStockError] = useState("")

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [orderState] = useState("generated");

  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newdate = day + "/" + month + "/" + year;

  // Establezco en el state email el correo de la cuenta que inicio sesión
  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  // Cargo del localStorage los valores de los inputs
  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    const storedName = localStorage.getItem("name");
    
    if (storedPhone){
      setInputPhone(JSON.parse(storedPhone));
      validatePhone(JSON.parse(storedPhone))
    }

    if (storedName) {
      setName(JSON.parse(storedName));
      setInputName(JSON.parse(storedName));
    }
    
  }, []);

  // Chequeo si el input de phone o name estan vacíos y en ese caso desactivo el boton submit del form
  useEffect(() => {
    if (phone === "" || name === ""){
      setSubmitDisabled(true);
      console.log(phone);
      console.log(name)
    }
    else{
      setSubmitDisabled(false)
    }
    
  },);

  // Chequeo si phoneError tiene algun valor y de ser así desactivo el boton submit del form
  useEffect(() => {
    if (phoneError !== "") {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [phoneError]);

  // Muestro un mensaje para completar los campos vacíos
  useEffect(() => {
    if (submitDisabled === true){
      setSubmitMessage("Debes completar los campos")
    }
    else{
      setSubmitMessage("")
    }
    
  },[submitDisabled]);

  // funcion para guardar el valor de los input en localStorage
  const storeInputPhone = (valor) => {setInputPhone(valor); localStorage.setItem("phone", JSON.stringify(valor))};
  const storeInputName = (valor) =>{setInputName(valor); localStorage.setItem("name", JSON.stringify(valor))};

  // Funcion para validar el valor phone con el RegEx de telefono declarado previamente ("phoneRegEx")
  const validatePhone = (value) => {
    if (value === "") {
      setPhone(value);
      setPhoneError("");
    } else 
    if (String(value).toLowerCase().match(phoneRegEx)) {
      setPhone(value);
      setPhoneError("");
    } else {
      setPhoneError("Teléfono inválido");
    }
  }

  // Si el carrito está vació se muestra este mensaje
  if (cart.length <= 0) 
  return (
    <div className="text-center mb-5">
      <h3 className="my-5"><BsFillCartFill /></h3>
      <div><b>Su carrito esta vacío</b></div>
    </div>
  );


  // Verifico la variable discount importada del cartContext y muestro el aviso de si se aplica o no
  let discountSpan = ""
  if (discount){
    discountSpan =<span className="text-success">Descuento del 25% en la 3era misma unidad aplicado</span>}
  else{
    discountSpan =<span className="text-danger">No hay descuentos aplicados</span>}

  // Filtro el cart a ver si algun item tiene mas cantidad del stock disponible en firebase.
  const noStockItems = cart.filter(item => item.qty>item.stock);

  // FUNCION DEL SUBMIT - Genero la orden en firebase
  const createOrder = async (e) => {
    // Como esta función esta siendo llamada desde el boton tipo "submit" del form, el "e.preventDefault" esta previniendo el comportamiento por default que tiene el submit, el cual es un "get" request a la URL por defecto. Pasando en limpio, estamos anulando ese comportamiento indeseado y definiendo, con las funciones a continuación, que sucede cuando se clickea en submit .
    e.preventDefault();

    // Validamos que haya stock. De no ser así detenemos la ejecución y devolvemos el error.
    if(noStockItems.length > 0){
      let itemsWithoutStock = ""
      for (let item of noStockItems) {
      itemsWithoutStock += " - " + item.nombre
      }
      setStockError("No hay suficientes productos en stock para la cantidad elegida de " + itemsWithoutStock)
      return
    }

    // Si queremos vaciar los inputs una vez que se genera la orden:
    // storeInputPhone("")
    // storeInputName("")

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
        html: `El id de su compra es <b>"${id}"</b><br>Fecha: ${fecha}<br><br><b>Detalle de compra:</b><br><br> <b>Comprador:</b> ${buyer.name} <br><br><b>Email:</b> ${buyer.email}<br><br> ${itemsAlert}<br><b>Total: $${total}</b> <br><br>Puedes visualizar este pedido en la sección "Pedidos"`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
  };

  return (

    <div className="minH col-lg-8 col-11 mx-auto">
      <h3 className="text-center my-5 py-2 bg-lightblue rounded shadow-sm">Carrito </h3>

      {cart.map((product) => (
        <div key={product.id + product.color} >
          <div className="d-none d-md-flex text-center justify-content-evenly align-items-center py-3 rounded bg-yellow mb-2 mx-3 shadow">
            <div className="h100"><img className=" img-fluid h-100" src={product.img} alt="" /></div>
            <div className="w20"><b><b>{product.nombre}</b></b></div>
            <div className="px-1">Valor unidad:<br /> <b><b>${product.valor}</b></b></div>
            <div className="px-1">Cantidad: <br /><b><b>{product.qty}</b></b></div>
            <div className="ps-1 pe-2">Color: <br /><b><b>{product.color}</b></b></div>
            <button className="px-2 rounded-5 button2"
            onClick={(e) => {
              e.stopPropagation();
              removeProduct(product.id, product.color)
            }}
            >Eliminar</button>
          </div>
          <div className="d-flex d-md-none flex-column justify-content-evenly py-3 rounded bg-yellow mb-2 text-center mx-3">
            <div className="d-flex justify-content-center">
              <div className="h100 pe-5"><img className=" img-fluid h-100" src={product.img} alt="" /></div>
              <div className="pt-3" ><b><b>{product.nombre}</b></b></div>
            </div> 
            <div className="d-flex justify-content-evenly pt-3 text-center">
              <div>Valor unidad:<br /> <b><b>${product.valor}</b></b></div>
              <div>Cantidad: <br /><b><b>{product.qty}</b></b></div>
              <div>Color: <br /><b><b>{product.color}</b></b></div>
              <button className="px-2 rounded-5 button2"
              onClick={(e) => {
                e.stopPropagation();
                removeProduct(product.id, product.color)
              }}
              >Eliminar</button>
            </div>
          </div>
        </div>
      ))}

      <div className="mx-3 my-4">
        <span className="size20 ">
          {discountSpan} <br />
          <span className="my-1 d-block"><b><b>Total: ${getTotal()}</b></b></span>
        </span>
      </div>

      <div className="mx-auto mb-5 text-center">
        <button className="mb-3 rounded-5 px-4 shadow-sm"
          onClick={() => emptyCart()}
          >Vaciar carrito</button>
      </div>

      {email ?
      (<div className="col-11 mx-auto">
        <h2 className="ms-1 mb-4 text-blue">Finaliza tu pedido</h2>
        <div className="ms-1 mb-3 text-dark" >Estas realizando el pedido desde <b> {email} </b></div>
        <form className="d-flex col-8 col-sm-7 col-md-6 col-xl-5 flex-column justify-content-around mb-5 mt-3 p-3 rounded text-white bg-blue shadow" >
          <div className="mt-2 text-yellow">
          {stockError}
          </div>
          <span>Nombre y apellido</span>
          <input
            className="col-10 border rounded border-dark my-2 py-2"
            onChange={(e) => {setName(e.target.value); storeInputName(e.target.value);}}
            onBlur={(e) => {setName(e.target.value); storeInputName(e.target.value);}}
            defaultValue={inputName}
          />
          <div className="mt-2 text-yellow">
            {phoneError}
          </div>
          <span>Teléfono</span>
          <input className=" col-10 border rounded border-dark my-2 py-2"
          onChange={(e) => {validatePhone(e.target.value); storeInputPhone(e.target.value)}}
          onBlur={(e) => {validatePhone(e.target.value); storeInputPhone(e.target.value)}}
          defaultValue={inputPhone}/>
          <div className="mt-2 text-yellow">
          {submitMessage}
          </div>
          <input className="mt-2 col-8 rounded button border border-dark shadow-sm" type="submit" value="Realizar Pedido" disabled={submitDisabled} onClick={createOrder} /> 
        </form>

        
      </div>)
      :
      (<div className="text-center col-12 mt-5"><div className="py-5">Debes iniciar sesión con una cuenta para realizar un pedido</div> 
        <Link className="p-3 text-decoration-none border border-dark rounded hover1" to='/signin'><b> Iniciar Sesión </b></Link>
      </div>)
      }

    </div>

  );
};
