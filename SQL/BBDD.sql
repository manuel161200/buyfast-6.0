
-- Creo la base de datos buyfast

CREATE DATABASE buyfast2;
USE buyfast2;

-- Tabla usuarios
CREATE TABLE usuarios (
    email CHAR(40) NOT NULL,
    PRIMARY KEY(email),
    dni CHAR (9),
    nombre CHAR(20),
    apellido CHAR(20),
    direccion CHAR(30),
    nomUsuario CHAR(20),
    password CHAR(20)
);

-- Creo el contenido de la tabla
INSERT INTO usuarios (email, dni, nombre, apellido, direccion, nomUsuario, password) VALUES
('maria@gmail.com', '22222222D', 'Maria', 'Rodriguez', 'C/Europa 16', 'mariaRO22', 'mariaRO22'),
('pepe@gmail.com', '44444444P', 'Pepe', 'Valencia', 'C/Alberto 22', 'pepeVA44', 'pepeVA44');

-- Pasamos a la parde de productos
-- Tabla Vehiculos
CREATE TABLE vehiculos (
    id_Vehiculo CHAR(20),
    PRIMARY KEY(id_Vehiculo),
    email_Usuario_Vendedor CHAR(40),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    modelo CHAR(20),
    color CHAR(20),
    kms CHAR(20),
    imagen_Vehiculo CHAR(45)
);

-- Auto_Increment para la tabla vehiculos
ALTER TABLE `vehiculos`
  MODIFY `id_Vehiculo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Creo el contenid de la tabla vehiculos
INSERT INTO vehiculos(id_Vehiculo, email_Usuario_Vendedor, nombre, estado, descripcion, precio, modelo, color, kms, imagen_Vehiculo) VALUES
('1', 'maria@gmail.com', 'Seat', 'Nuevo', 'El vehiculo esta practicamente nuevo', '4000', 'Ibiza', 'Rojo', '200000', 'seat.jpg'),
('2', 'maria@gmail.com', 'Opel', 'Sin abrir', 'No ha sido estrenado', '10000', 'Corsa', 'Rojo', '0', 'opel.jpg'),
('3', 'pepe@gmail.com', 'Honda', 'Roto', 'Para piezas o arreglos', '600', 'civic', 'Naranja', '400000', 'honda.jpg'),
('4', 'pepe@gmail.com', 'Peugeot', 'Aceptable', 'El coche esta en buen estado', '207', '1500', 'Negro', '200000', 'peugeot.jpg');

-- Tabla ropas
CREATE TABLE ropas (
    id_Ropa CHAR(20) NOT NULL,
    PRIMARY KEY(id_Ropa),
    email_Usuario_Vendedor CHAR(40),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    marca CHAR(20),
    talla CHAR(20),
    sexo CHAr(20),
    imagen_Ropa CHAR(45)
);

ALTER TABLE `ropas`
  MODIFY `id_Ropa` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Creo el contenido de la tabla ropas
INSERT INTO ropas(id_Ropa, email_Usuario_Vendedor, nombre, estado, descripcion, precio, marca, talla, sexo, imagen_Ropa) VALUES
('1', 'maria@gmail.com', 'sudadera', 'Nuevo', 'Esta sin estrenar', '30', 'Nike', 'L', 'Hombre', 'sudadera.jpg'),
('2', 'maria@gmail.com', 'pantalon', 'Aceptable', 'Tiene algunos meses de uso', '15', 'Levis', 'XL', 'Mujer', 'pantalon.jpg'),
('3', 'pepe@gmail.com', 'camiseta', 'Bueno', 'Tiene muy poco uso', '10', 'Addidas', 'M', 'Hombre', 'camiseta.jpg'),
('4', 'pepe@gmail.com', 'zapatos', 'Aceptable', 'Estan algo desgastados', '20', 'Converse', '42', 'Hombre', 'zapatos.jpg');

-- Tabla electronicas
CREATE TABLE electronicas (
    id_Electronica CHAR(20) NOT NULL,
    PRIMARY KEY(id_Electronica),
    email_Usuario_Vendedor CHAR(40),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    modelo CHAR(20),
    tipo CHAR(20),
    imagen_Electronica CHAR(45)
);

ALTER TABLE `electronicas`
  MODIFY `id_Electronica` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Creo el contenido de la tabla electronicas
INSERT INTO electronicas(id_Electronica, email_Usuario_Vendedor, nombre, estado, descripcion, precio, modelo, tipo, imagen_Electronica) VALUES
('1', 'maria@gmail.com', 'Portatil', 'Bueno', 'Muy poco uso', '150', 'HP', 'portatil', 'portatil.jpg'),
('2', 'maria@gmail.com', 'Movil', 'Nuevo', 'Sin estrenar', '250', 'Galaxy', 'smartphone', 'movil.jpg'),
('3', 'pepe@gmail.com', 'Televisión', 'Aceptable', 'Tiene algo de tiempo pero funciona bien', '175', 'LG', 'samrtTV', 'television.jpg'),
('4', 'pepe@gmail.com', 'Impresora', 'Rota', 'No funciona', '20', 'HP', 'impresora', 'impresora.jpg');
-- Tabla otros
CREATE TABLE otros (
    id_Otro CHAR(20) NOT NULL,
    PRIMARY KEY(id_Otro),
    email_Usuario_Vendedor CHAR(40),
    nombre CHAR(20),
    estado CHAR(20),
    descripcion CHAR(255),
    precio CHAR(20),
    imagen_Otro CHAR(45)
);

ALTER TABLE `otros`
  MODIFY `id_Otro` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Creo el contenido de la tabla otros
INSERT INTO otros(id_Otro, email_Usuario_Vendedor, nombre, estado, descripcion, precio, imagen_Otro) VALUES
('1', 'maria@gmail.com', 'Sofa', 'Aceptable', 'Tiene algunas manchas', '70', 'sofa.jpg'),
('2', 'maria@gmail.com', 'Frigorífico', 'Como nuevo', 'Funciona perfectamente', '150', 'frigorifico.jpg'),
('3', 'pepe@gmail.com', 'Mesa', 'Nuevo', 'Sin estrenar', '50', 'mesa.jpg'),
('4', 'pepe@gmail.com', 'Pelota', 'Aceptable', 'Tiene bastante uso', '5', 'pelota.jpg');
-- Tabla compra de vehiculos
CREATE TABLE compra_Vehiculos (
    id_Compra_Vehiculo CHAR(20) NOT NULL,
    PRIMARY KEY(id_Compra_Vehiculo),
    id_Vehiculo CHAR(20),
    email_Usuario_Comprador CHAR(40),
    estado_compra CHAR(20)
);

-- Auto_Increment para la tabla compra_Vehiculos
ALTER TABLE `compra_Vehiculos`
  MODIFY `id_Compra_Vehiculo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

INSERT INTO compra_Vehiculos (id_Compra_Vehiculo, id_Vehiculo, email_Usuario_Comprador, estado_compra) VALUES
('1', '1', '', 'Disponible'),
('2', '2', '', 'Disponible'),
('3', '3', '', 'Disponible'),
('4', '4', '', 'Disponible');

-- Tabla compra de ropas
CREATE TABLE compra_Ropas (
    id_Compra_Ropa CHAR(20) NOT NULL,
    PRIMARY KEY(id_Compra_Ropa),
    id_Ropa CHAR(20),
    email_Usuario_Comprador CHAR(40),
    estado_compra CHAR(20)
);

-- Auto_Increment para la tabla compra_Ropas
ALTER TABLE `compra_Ropas`
  MODIFY `id_Compra_Ropa` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

INSERT INTO compra_Ropas (id_Compra_Ropa, id_Ropa, email_Usuario_Comprador, estado_compra) VALUES
('1', '1', '', 'Disponible'),
('2', '2', '', 'Disponible'),
('3', '3', '', 'Disponible'),
('4', '4', '', 'Disponible');

-- Tabla compra de electronicas
CREATE TABLE compra_Electronicas (
    id_Compra_Electronica CHAR(20) NOT NULL,
    PRIMARY KEY(id_Compra_Electronica),
    id_Electronica CHAR(20),
    email_Usuario_Comprador CHAR(40),
    estado_compra CHAR(20)
);

-- Auto_Increment para la tabla compra_Electronicas
ALTER TABLE `compra_Electronicas`
  MODIFY `id_Compra_Electronica` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

INSERT INTO compra_Electronicas (id_Compra_Electronica, id_Electronica, email_Usuario_Comprador, estado_compra) VALUES
('1', '1', '', 'Disponible'),
('2', '2', '', 'Disponible'),
('3', '3', '', 'Disponible'),
('4', '4', '', 'Disponible');

-- Tabla compra de ropas
CREATE TABLE compra_Otros (
    id_Compra_Otro CHAR(20) NOT NULL,
    PRIMARY KEY(id_Compra_Otro),
    id_Otro CHAR(20),
    email_Usuario_Comprador CHAR(40),
    estado_compra CHAR(20)
);

-- Auto_Increment para la tabla compra_Otros
ALTER TABLE `compra_Otros`
  MODIFY `id_Compra_Otro` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

INSERT INTO compra_Otros (id_Compra_Otro, id_Otro, email_Usuario_Comprador, estado_compra) VALUES
('1', '1', '', 'Disponible'),
('2', '2', '', 'Disponible'),
('3', '3', '', 'Disponible'),
('4', '4', '', 'Disponible');

-- Tabla chats
CREATE TABLE chats (
  id CHAR(20) NOT NULL,
  PRIMARY KEY(id),
  email_comprador CHAR(40),
  email_vendedor CHAR(20)
);

ALTER TABLE `chats`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Tabla mensajes
CREATE TABLE mensajes (
  id CHAR(20) NOT NULL,
  PRIMARY KEY(id),
  chat_id CHAR(20),
  email CHAR(40),
  contenido CHAR(100),
  date TIMESTAMP
);

ALTER TABLE `mensajes`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

