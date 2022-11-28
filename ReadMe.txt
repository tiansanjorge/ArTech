E-commerce de ArgenTech - empresa fantasía de tecnología.
Aplicación web desarrollada con React JS.


El sitio cuenta con una galería de productos en el home con un menu superior con 
opciones para visualizar productos por categoria. Ingresando en un producto, 
encontramos una vista deatallada con la información del mismo. Si se ingresa un
id diferente en la ruta de un producto (ej: "http://localhost:3000/product/idInexistente")
se mostrará una pagina de Error.

Obviamente, posee además carrito de compras al cual se puede acceder en todo momento
desde un icono en la esquina superior derecha, en la barra de navegación.
El icono luce un marcador que indica la cantidad de productos ya ingresados.

La pagina del carrito muestra un mensaje de carrito vacío en caso de que no tenga productos.
En caso de ya haber agregado alguno, muestra el detalle de los productos ingresados 
y un formulario para realizarla. Éste uiltimo cuenta con validación de los valores ingresados.
En caso de escribir incorrectamente el telefono, el mail, o que ocurrió.

Una vez apretado el boton del formulario, la aplicación trabaja con la base de datos 
firebase y genera la orden de compra. Acto seguido, se muestra una sweetAlert con el
detalle de la misma (id, fecha, items, etc.). La orden es recibida por firebase.

Se utilizaron 2 librerías en el proyecto:
• Bootstrap (para dar estilos rapidamente)
• SweetAlert (para informar el detalle de la compra)


