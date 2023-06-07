
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
        <div className="text-center my-5">
            <h2><b>Mis pedidos</b></h2>
        
        {loading ? <Loader /> :
        <div>
            {/* Verifica si hay usuario logeado y devuelve lo siguiente */}
            {user ?
            // si ese usuario tiene algun pedido se devuelve lo siguiente 
            (orders.length > 0 ?
            <div className="row align-items-center justify-content-around">
                {orders.map((order) => (
                    <div key={order.id} className="col-3 mx-1 my-4 p-5 border">
                        <div>Fecha: <b><b>{order.fecha}</b></b></div>
                        <div>ID del pedido: <b><b>{order.id}</b></b></div>
                        <br />
                        <div>Items: 
                            <br />
                            <br />
                                {order.items.map((item) => (
                                    <div key={item.id + item.color}>
                                        <b><b>{item.nombre} - {item.color}</b></b> x<b><b>{item.qty}</b></b><br />Precio Unitario: <b><b>${item.valor}</b></b>
                                        <br />
                                        <br />
                                    </div>
                                ))}
                                
                        </div>
                        <div><b><b>Valor total: ${order.total}</b></b></div>
                        
                    </div>
                ))}
            </div>
            :
            // si no hay pedidos se devuelve lo siguiente 
            <div className="text-center col-12 mt-5">No has realizado ningún pedido.</div>
            ):
            // si no detecta un usuario logeado devuelve lo siguiente
            (
                <div className="text-center col-12 mt-5"><div className="py-5">Debes iniciar sesión con una cuenta para visualizar tus pedidos</div> 
                    <Link className="p-3" style={{ color: "#000", textDecoration: "none", borderStyle: "solid", borderRadius: 5}} to='/signin'><b> Iniciar Sesión </b></Link>
                </div>
            )
            }
        </div>
        }
            
        </div>

    );

}