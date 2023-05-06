import {db} from "./config";
import {
    collection,
    //Muchos
    getDocs,
    where,
    //Uno
    getDoc,
    doc,
    //busquedas
    query,
    limit,
    addDoc,
    updateDoc,
    writeBatch,
    increment,
    deleteDoc
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

// Agregamos la orden que pasamos por parametro a la colección "orders" de firebase. Retornamos su "ID"
export const addOrder = async (order) => {
    const orderDoc = await addDoc(ordersRef, order)

    return orderDoc.id
}

export const getOrders = async (email) => {
    const orders = [];

    // filtración de productos segun mail de la cuenta (pasada por param.), si no se pasó param. van todas las ordenes.
    const q = query(ordersRef, where("buyer.email", "==", email)) 

    // Llamo a los docs pertenecientes a la coleccion "orders" de firebase, segun lo filtrado previamente (q).
    const querySnapshot = await getDocs(q);
    
    // Recorremos cada doc de la coleccion "orders" de firebase y lo agregamos al array "orders", pasando sus datos como objeto con "...doc.data()" y agregandole a ese objeto la propiedad "id" que definimos con el id del doc de firebase
    querySnapshot.forEach((doc) => {
        orders.push({
            ...doc.data(),
            id: doc.id
        });
    });
    console.log(orders)
    return orders;
};