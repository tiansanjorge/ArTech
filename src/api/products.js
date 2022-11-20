
import { db } from "./config";

const products = [{
        id: '1',
        nombre: "SAMSUNG GALAXY A12",
        valor: 95000,
        tag: "Celular",
        categoria:"Celulares",
        // img: "img/12.jpg",
        img: "https://zetaelectronica.com.ar/wp-content/uploads/2021/04/galaxy-a12-dual-sim-fizic-64gb-lte-4g-alb-4gb-ram_10071445_1_1608121717.jpeg",
        stock: 10,
    },
    {
        id: '2',
        nombre: "SAMSUNG GALAXY A13",
        valor: 60000,
        tag: "Celular",
        categoria:"Celulares",
        // img: "../img/a13.jpg"
        img: "https://zetaelectronica.com.ar/wp-content/uploads/2021/04/galaxy-a12-dual-sim-fizic-64gb-lte-4g-alb-4gb-ram_10071445_1_1608121717.jpeg",
        stock: 10,
    },
    {
        id: '3',
        nombre: "IPHONE 13 PRO MAX 4K",
        valor: 300000,
        tag: "Celular",
        categoria:"Celulares",
        // img: "../img/13.jpg"
        img: "https://zetaelectronica.com.ar/wp-content/uploads/2021/04/galaxy-a12-dual-sim-fizic-64gb-lte-4g-alb-4gb-ram_10071445_1_1608121717.jpeg",
        stock: 10,
    },
    {
        id: '4',
        nombre: "LG 43' FULLHD T4600",
        valor: 82000,
        tag: "TV",
        categoria:"Televisores",
        // img: "img/lg1.jpg"
        img: "https://samsungar.vtexassets.com/arquivos/ids/164879/01.jpg?v=637453798418000000",
        stock: 10,
    },
    {
        id: '5',
        nombre: "LG 43' FULLHD F5300",
        valor: 100000,
        tag: "TV",
        categoria:"Televisores",
        // img: "img/lg2.jpg"
        img: "https://samsungar.vtexassets.com/arquivos/ids/164879/01.jpg?v=637453798418000000",
        stock: 10,
    },
    {
        id: '6',
        nombre: "SAMSUNG 43' FULL HD",
        valor: 126000,
        tag: "TV",
        categoria:"Televisores",
        // img: "img/s1.jpg"
        img: "https://samsungar.vtexassets.com/arquivos/ids/164879/01.jpg?v=637453798418000000",
        stock: 10,
    },
];


//  Filtrar por categoria 
export const getProducts = (categoria) =>
    new Promise((res, rej) => {
        const response = categoria ?
            products.filter((p) => p.categoria === categoria) :
            products;
        setTimeout(() => {
            res(response);
        }, 2000);
    });

//  Filtrar por ID
export const getProduct = (productId) =>
    new Promise((res, rej) => {
        const response = products.find((product) => product.id == productId);
        setTimeout(() => {
            res(response);
        }, 2000);
    });
