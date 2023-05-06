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

// const products = [{
//         nombre: "IPHONE X",
//         valor: 395000,
//         tag: "Celular",
//         categoria: "Celulares",
//         img: "https://cdn.shopify.com/s/files/1/0599/5413/5239/products/iphone-xs-max-517547_2048x2048.jpg?v=1674907123",
//         stock: 50,
//     },
//     {
//         nombre: "LG K22",
//         valor: 45000,
//         tag: "Celular",
//         categoria: "Celulares",
//         img: "https://speedpc.es/fotos/18087.jpg",
//         stock: 50,
//     },
//     {
//         nombre: "XIAOMI REDNOTE 11",
//         valor: 105000,
//         tag: "Celular",
//         categoria: "Celulares",
//         img: "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/6934177767166_800.jpg",
//         stock: 50,
//     },
//     {
//         nombre: "TCL 40' SMART TV HD",
//         valor: 75000,
//         tag: "TV",
//         categoria: "Televisores",
//         img: "https://images.fravega.com/f1000/71c66532a2129397660653affe213d13.jpg",
//         stock: 50,
//     },
//     {
//         nombre: "SAMSUNG 40' FULL HD",
//         valor: 500000,
//         tag: "TV",
//         categoria: "Televisores",
//         img: "https://images.samsung.com/is/image/samsung/p6pim/co/un40t5290akxzl/gallery/co-fhd-t5300-383096-un40t5290akxzl-417825758?$1300_1038_PNG$",
//         stock: 50,
//     },
//     {
//         nombre: "SONY 32' HD",
//         valor: 50000,
//         tag: "TV",
//         categoria: "Televisores",
//         img: "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202202/10/00114841914709____8__1200x1200.jpg",
//         stock: 50,
//     },
// ];

// PARA CARGAR PRODUCTOS A FIREBASE CON EL ARRAY PREVIO "products"
// export const cargarData = () =>{
//     products.forEach(async (product) => {
//         await addDoc(productsRef, product)
//     })
// }