import {db} from "./config";
import {collection, addDoc} from "firebase/firestore";

const ordersRef = collection(db, "orders");

// Agregamos la orden que pasamos por parametro a la colección "orders" de firebase. Retornamos su "ID"
export const addOrder = async (order) => {
    const orderDoc = await addDoc(ordersRef, order)

    return orderDoc.id
}