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

const productsRef = collection(db, "items");
export const getProducts = async (categoria) => {
    const products = [];

    const q = categoria ?
        query(productsRef, where("categoria", "==", categoria)) :
        productsRef;

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        products.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return products;
};

export const getProduct = async (productId) => {
    const document = doc(db, "items", productId);

    const docSnap = await getDoc(document);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    }

    return null;
};

export const updateProduct = async (id, item) => {
    const productDoc = await updateDoc(doc(db, "items", id), item);
    return;
};

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

    // for (let id in items) {
    //     const docRef = doc(db, "items", id);
    //     batch.update(docRef, {
    //         stock: increment(-items[id])
    //     })
    // }
    // items.forEach(id => {
    //     const docRef = doc(db, "items", id)
    //     batch.update(docRef, {
    //         stock: increment(-400)
    //     })
    // })

    batch.commit();

};

export const deleteProduct = async (id) => {
    const docRef = doc(db, "items", id)
    const element = await deleteDoc(docRef)
}

// export const cargarData = () =>{
//     products.forEach(async (product) => {
//         await addDoc(productsRef, product)
//     })
// }

//  Filtrar por categoria 
// export const getProducts = (categoria) =>
//     new Promise((res, rej) => {
//         const response = categoria ?
//             products.filter((p) => p.categoria === categoria) :
//             products;
//         setTimeout(() => {
//             res(response);
//         }, 2000);
//     });

//  Filtrar por ID
// export const getProduct = (productId) =>
//     new Promise((res, rej) => {
//         const response = products.find((product) => product.id == productId);
//         setTimeout(() => {
//             res(response);
//         }, 2000);
//     });