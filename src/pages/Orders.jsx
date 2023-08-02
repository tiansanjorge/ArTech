
import { useEffect, useState } from "react";
import { useAuthContext } from '../context/authContext';
import { getOrders } from "../api/orders";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";


export const Orders = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const formattedNumberOption = { useGrouping: true, minimumFractionDigits: 0 };
    
    useEffect(() => {
        if (user && user.email) {
            getOrders(user.email).then((data) => {
                const sortedOrders = data.sort((a, b) => compareDates(a.fecha, b.fecha));
                setOrders(sortedOrders);
                setLoading(false);
            }).catch((e) => navigate("/error"))
        }
        else{setLoading(false)}
    }, [user?.email]);

    // Esto es para que aparezca el mensaje "Cargando..."" en vez de "No has realizado ningún pedido." mientras carga las ordenes de firebase.
    setTimeout(() => {
        setLoading2(false)
    }, 2000);

    // Función para convertir la string de order.fecha en un objeto Date
    const parseDate = (dateString) => {
        const parts = dateString.split("/");
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // El mes en objetos Date es 0-indexed (0-11)
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    };

    // Función para comparar fechas, utilizada en data.sort arriba
    const compareDates = (date1, date2) => {
        const parsedDate1 = parseDate(date1);
        const parsedDate2 = parseDate(date2);
        return parsedDate2 - parsedDate1;
    };

    return (
        <div className="minH text-center my-5 col-lg-8 col-11 mx-auto">
            <h3 className='shadow-sm py-2 bg-lightblue rounded'>Pedidos</h3>
        
        {loading ? <Loader /> :
            <div>
                {/* Verifica si hay usuario logeado y devuelve lo siguiente */}
                {user ?
                // si ese usuario tiene algun pedido se devuelve lo siguiente 
                    (orders.length > 0 ?
                        <div className="row justify-content-around" >
                            {orders.map((order) => (
                                
                                <div key={order.id} className="col-xl-4 col-lg-5 col-md-5 col-9 mx-1 my-4 py-5 px-3 align-top shadow" style={{border: "2px" , borderStyle: 'dashed', borderColor: "#1684a3"}}>
                                    <div>Fecha: <span className="text-danger"><b><b>{order.fecha}</b></b></span></div>
                                    <br />
                                    <div>ID de Orden: <b><b>{order.id}</b></b></div>
                                    <br />
                                    <div>Items: 
                                        <br />
                                        <br />
                                            {order.items.map((item) => (
                                                <div key={item.id + item.color}>
                                                    <b><b>{item.nombre} - {item.color}</b></b> x<b><b>{item.qty}</b></b><br /><br />Precio Unitario: <b><b>${item.valor.toLocaleString('es-ES', formattedNumberOption)}</b></b>
                                                    <br />
                                                    <br />
                                                </div>
                                            ))}
                                            
                                    </div>
                                    <div><b><b>Valor total: </b></b><span className="text-success"><b><b>${order.total.toLocaleString('es-ES', formattedNumberOption)}</b></b></span></div>
                                    
                                </div>
                            ))}
                        </div>
                    :(loading2 ? <Loader /> :
                    // si no hay pedidos se devuelve lo siguiente 
                    <div className="text-center col-12 mt-5">No has realizado ningún pedido.</div>
                    )
                ):
                // si no detecta un usuario logeado devuelve lo siguiente
                (
                    <div className="text-center col-12 mt-5"><div className="py-5">Debes iniciar sesión con una cuenta para visualizar tus pedidos</div> 
                        <Link className="p-3 text-decoration-none border border-dark rounded hover1"  to='/signin'><b> Iniciar Sesión </b></Link>
                    </div>
                )

                }
            </div>
        }
            
        </div>

    );

}