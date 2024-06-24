const Product = require('../models/products.model');
//TRY CATCH

// [GET] http://localhost:3000/products Retorna un objeto con los datos de todos los products. Retorna un status 200. Payload {[{datos_de_product}, {datos_de_product}, ...]}
const obtenerTodosLosProductos = async () => {
    return await Product.find();
};

// [GET] http://localhost:3000/products Retorna un objeto con los datos de todos los products. Retorna un status 200. Payload {[{datos_de_product}, {datos_de_product}, ...]}
const obtenerProductoPorId = async (id) => {
    return await Product.findById(id);
};

// [POST] http://localhost:3000/products Se envía en el body los datos del proveedor a crear y retorna un status 201. Payload {message: "proveedor creado", provider:{datos_del_proveedor_creado}}.
const crearProducto = async (datosProducto) => {
    const product = new Product(datosProducto);
    return await product.save();
};

// [PUT] http://localhost:3000/products Se envía en el body los datos del proveedor a editar y retorna un status 200. Payload {message: "proveedor actualizado: Adidas", provider:{datos_del_proveedor_editado}}.
const actualizarProducto = async (id, datosProducto) => {
    return await Product.findByIdAndUpdate(id, datosProducto, { new: true });
};

// [DELETE] http://localhost:3000/products Se envía en el body el título del proveedor a borrar y retorna un status 200. Payload {message: "Se ha borrado el proveedor: Nintendo"}.
const eliminarProducto = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    obtenerTodosLosProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};