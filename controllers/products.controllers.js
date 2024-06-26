const Product = require('../models/products.model');
const services = require('../services/products.service');
const { validationResult } = require("express-validator");

// // CREATE (directamente sin services)
// const createProduct = async (req, res) => {
//     console.log(req.body);

//     try{
//         const data = req.body;
//         let answer = await new Product(data).save();
//         res.status(201).json(answer);

//     }catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({msj:`ERROR: ${error.stack}`});
//     }
// }

// CREATE
const createProduct = async (req, res, next) => {
    console.log(req.body);

    const errors = validationResult(req);

    // if there are validation errors (express-validator)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try{
        const data = req.body;
        let answer = await services.crearProducto(data);
        res.status(201).json(answer);

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
        next(error);
    }
}

// // READ (directamente sin services)
// const getProduct = async (req, res) => {
//         try {
//             const id = req.params.id;
//             let products = id? await Product.find({id},'-__v') : await Product.find({},'-__v'); //{}
//             res.status(200).json(products); // Respuesta de la API para 1 producto
//         }
//         catch (error) {
//             console.log(`ERROR: ${error.stack}`);
//             res.status(400).json({msj:`ERROR: ${error.stack}`});
//         }
// }

// READ
const getProduct = async (req, res) => {

    try {
        const id = req.params.id;
        let products = id? await services.obtenerProductoPorId(id) : await services.obtenerTodosLosProductos(); //{}
        res.status(200).json(products); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

// // UPATE (directamente sin services)
// const editProduct = (req, res) => {
//     res.status(200).send("Producto editado!");
// }

// UPATE
const editProduct = async (req, res) => {
    const errors = validationResult(req);

    // Manejar errores de validación (express-validator)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {
        const id = req.params.id;
        const data = req.body;
        const updatedProduct = await services.actualizarProducto(id, data);
        res.status(200).json({ message: `Producto actualizado: ${updatedProduct.title}`, product: updatedProduct });
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.status(400).json({ msj: `ERROR: ${error.message}` });
    }
};

// // DELETE (directamente sin services)
// const deleteProduct = (req, res) => {
//     res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
// }

// DELETE
const deleteProduct = async (req, res) => {
    const errors = validationResult(req);

    // Manejar errores de validación (express-validator)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {
        const id = req.params.id;
        const deletedProduct = await services.eliminarProducto(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        res.status(200).json({ message: `Producto eliminado: ${deletedProduct.title}`, product: deletedProduct });
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.status(400).json({ msj: `ERROR: ${error.message}` });
    }
};

module.exports = {
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}