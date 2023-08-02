ArTech (E-commerce)

Aplicación web de una empresa ficticia que ofrece productos de tecnología. El sitio fue desarrollado por Sebastián Sanjorge y es parte de su portfolio profesional. Elaborado con React JS, luce un diseño minimalista y práctico.

■ CARACTERISTICAS ■

• Catálogo de productos
   - División por categorias
   - Opción para ordenar por precio
• Carrito de compras
• Registro de usuarios
• Sección favoritos
• Sección de pedidos realizados
• Conexión en tiempo real con Firebase (Base de datos de google)

■ REQUISITOS PREVIOS ■

Para ejectura el proyecto es necesario tener instalado Node.js y npm.

■ INSTALACION ■

1. Clona este repositorio en tu ordenador.
2. Navega al directorio raiz del proyecto y abre la consola en esa dirección.
3. Ejecuta el comando "npm i" + (la dependencia) para instalar las dependencias enlistadas en la siguiente sección
4. Ejecuta el comando "npm start" para iniciar la aplicación.

■ DEPENDENCIAS UTILIZADAS ■

Para instalar cada dependencia puedes copiar el comando que aparece luego de  "•" y ejecturalo en la consola ubicada en el directorio raiz del proyecto.

- bootstrap (^5.2.2) 		• npm i bootstrap
- firebase (^9.14.0) 		• npm i firebase
- react (^18.2.0) 			• npm i -g create-react-app
- react-bootstrap (^2.5.0) 		• npm i react-bootstrap
- react-google-button (^0.7.2) 	• npm i react-google-button
- react-icons (^4.8.0) 		• npm i react-icons
- react-router-dom (^6.4.2) 		• npm i react-router-dom
- react-select (^5.7.2) 		• npm i react-select
- react-toastify (^9.1.3) 		• npm i react-toastify
- reactstrap (^9.1.9) 		• npm i reactstrap 
- sass (^1.55.0) 			• npm i sass
- sweetalert2 (^11.6.14) 		• npm i sweetalert2

■ DESCRIPCION Y USO ■

La aplicacion emula una tienda virtual y esta compuesta por las paginas listadas a a continuación. Todas cuentan con una barra de navegación en el sector superior, espacios con publicidades y un footer en el margen inferior:

• Home:
En el inicio se ve un sofisticado slideshow con imágenes estéticamente compuestas que ilustran la marca y dan acceso a sus dos categorias principales: Celulares y TV. Debajo muestra una grilla de todos los productos, cada uno en formato de tarjeta que incluye una foto, el precio, el nombre y 2 botones: uno para añadir al carrito de compras y otro para agregarlo a favoritos. La página cuenta además con un menú para ordenar los productos por precios (ascendente y descendente)

• Categoria - Celulares / TV: 
Una sección que contiene la misma grilla de productos que home, pero solo muestra aquellos productos dentro de la categoría celulares o televisores. Posee también la opcion para ordenar por precio.

• Producto: 
Haciendo click en la tarjeta de un producto se ingresa a la página particular de ese producto. Encontramos nuevamente el nombre, una imágen mas grande, el precio y además una descripción del producto. Para agregarlo al carrito o a favoritos en esta página tenemos un menu desplegable para elegir el color y un contador con botones que nos permite agregar la cantidad deseada, siempre y cuando sea igual o menor a la cantidad disponible en stock (que figura escrita ahí mismo). En caso de no elegir un color, o exceder la cantidad de productos disponibles se mostrara un mensaje de error y no permitira agregarlo.

• Iniciar Sesión / Cuenta: 
El sitio cuenta con la posibilidad de logearse con una cuenta de Google. Si no estas logeado en la barra de navegación encontrarás la opción "Iniciar sesión" que te dirigirá a una página con un boton para logearte, si ya estas logeado se mostrará la opción "Cuenta" y en la página a la que accederas aparecerá tu información básica: Nombre, apellido y correo electrónico. Incluye además una opción para cerrar la sesión.

• Favoritos: 
Tanto desde el catálogo general, como desde la vista individual de cada producto este puede ser añadido a favoritos por medio del botón "★" ubicado en cada tarjeta. Para acceder a esta sección hacemos click en la estrella ubicada arriba a la derecha en la barra de navegación. Esta sección esta pensada para hacer una pre-selección de los productos que añadiremos al carrito.

• Carrito de compras: 
Así como agregamos un producto a favoritos tenemos tambien la opcion de agregarlos al carrito. Para acceder a esta sección hacemos click en el carrito "🛒" ubicado tambien arriba a la derecha en la barra de navegación. Acá encontraremos un detalle resumido de todos los productos agregados, un aviso de si se esta aplicando algún descuento y el valor total de la compra. Si el usuario está logeado, para finalizar la compra se mostrara un formulario, una vez completado se apreta el boton "realizar pedido" y aparecerá una alerta con todo el detalle de la compra con su ID de orden. 

• Pedidos: 
En esta página aparecerán todos los pedidos realizados con el usuario logeado. Se muestra la fecha, el ID de la orden, los items con nombre, valor, color, cantidad y el valor total del pedido.

Nota: La aplicación esta conectada a Firebase y la cantidad de productos en stock se actualizan en tiempo real.  En caso de que el stock de un producto llegue a cero el sitio no permite agregar al carrito ese producto.

■ CONTACTO ■

Sebastian Sanjorge • Front-End developer

• Telefono:
	+54 9 11 6006 9979
•Mail:
	sanjorgesebastian@gmail.com
• Perfil de Linkedin:
	https://www.linkedin.com/in/sebasti%C3%A1n-sanjorge-60a943130/

