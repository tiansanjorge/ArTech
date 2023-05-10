
import { useEffect, useState } from "react";
import { useAuthContext } from '../context/authContext';
import { getOrders } from "../api/orders";
import { useNavigate } from "react-router-dom";


export const Orders = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            getOrders(user.email).then((data) => {
                setOrders(data);
            }).catch((e) => navigate("/error"))
        }
    }, [user?.email]);

    console.log(orders, user)

    return (
        <div className="text-center mt-5">
            <h2><b>Mis pedidos</b></h2>
            {orders.map((order) => (
                <div key={order.id} className="my-5">
                    <div>Fecha: <b><b>{order.fecha}</b></b></div>
                    <div>ID del pedido: <b><b>{order.id}</b></b></div>
                    <br />
                    <div>Items: 
                        <br />
                        <br />
                            {order.items.map((item) => (
                                <div key={item.id}>
                                    <b><b>{item.nombre} - {item.color}</b></b> x<b><b>{item.qty}</b></b><br />Precio Unitario: <b><b>${item.valor}</b></b>
                                    <br />
                                    <br />
                                </div>
                            ))}
                    </div>
                    <div><b><b>Valor total: ${order.total}</b></b></div>
                    _______________________________________
                </div>
            ))}
        </div>

    );

}