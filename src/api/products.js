import {
    db
} from "./config";
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

// guardo en la variable "productsRef" la coleccion "items" de firebase.
const productsRef = collection(db, "items");

export const getProducts = async (categoria) => {
    const products = [];

    // filtración de productos segun categoria (pasada por param.), si no se pasó param. van todos los productos.
    const q = categoria ?
        query(productsRef, where("categoria", "==", categoria)) :
        productsRef;

    // Llamo a los docs pertenecientes a la coleccion "items" de firebase, segun lo filtrado previamente (q).
    const querySnapshot = await getDocs(q);
    
    // Recorremos cada doc de la coleccion "items" de firebase y lo agregamos al array "products", pasando sus datos como objeto con "...doc.data()" y agregandole a ese objeto la propiedad "id" que definimos con el id del doc de firebase
    querySnapshot.forEach((doc) => {
        products.push({
            ...doc.data(),
            id: doc.id
        });
    });
    return products;
};

export const getProduct = async (productId) => {
    // Guardo en una const el documento: que esta dentro de la database de firebase y a su vez dentro de la colección "items", y buscando el doc con el id que le pasamos por param.
    const document = doc(db, "items", productId);

    // Uso la función getDoc para llamarlo 
    const docSnap = await getDoc(document);

    // si encuentra el documento retorna sus datos como objeto con "docsnap.data()" y le agrega al objeto la propiedad "id" que definimos con el id del doc de firebase
    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            id: docSnap.id,
        };
    }

    throw new Error("producto no encontrado")
};

export const updateProduct = async (id, item) => {
    const productDoc = await updateDoc(doc(db, "items", id), item);
    return;
};

// Actualizamos el sotck de los productos en firebase
export const updateManyProducts = async (items) => {
    const batch = writeBatch(db);
    items.forEach(({
        id,
        qty
    }) => {
        const docRef = doc(db, "items", id)
        batch.update(docRef, {
            stock: increment(-qty)
        })
    })

    await batch.commit();

};

export const deleteProduct = async (id) => {
    const docRef = doc(db, "items", id)
    const element = await deleteDoc(docRef);
    return
}

// PARA CARGAR PRODUCTOS A FIREBASE CON EL ARRAY PREVIO "products"
// export const cargarData = () =>{
//     products.forEach(async (product) => {
//         await addDoc(productsRef, product)
//     })
// }