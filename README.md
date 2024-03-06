# codeserver

## Product Manager
![line 1 to 18](/codeserver/images/image.png)
Se creó la clase ProductManager donde se declaro un array vacio de productos. Dentro del create se recibe un OBJETO nombrado "data", este objeto va a recibir los atributos que definimos en la constante product: id, titulo, foto, categoria, precio y stock.
Luego de asignar los atributos recibidos por el parametro de entrada a nuestra constante product (objeto), se llama a la clase "ProductManager", se llama al array de products de la clase y se realiza un push del producto que recién recibió todos los parametros. De esta manera agregamos un nuevo producto al array products.
Dentro de la funcion "read" que pertenece a la clase ProductManager, se hace un return del array para visualizar en consola los objetos dentro de ese array.

![line 20 to 57](/codeserver/images/image-1.png)
Acá se creo una instancia de la clase "ProductManager", con el nombre "gestorDeProductos" y se hizo uso de la función "create". Se crearon 5 productos como la consigna lo indica y luego se hizo el console.log de la funcion "read" para visualizar todos los productos recién agregados al array, quedando en la consola de la siguiente manera:
![console-view](/codeserver/images/image-2.png)

## UserManager
Se realizó el mismo procedimiento que en Product Manager