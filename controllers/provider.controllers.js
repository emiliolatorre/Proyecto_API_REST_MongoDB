const { defaultMaxListeners } = require('supertest/lib/test');
const Provider = require('../models/provider.model');
const services = require('../services/provider.service');
const { validationResult } = require("express-validator");

// // CREATE (directamente sin Services)
// const createProvider = async (req, res) => {
//     console.log(req.body);

//     try{
//         const data = req.body;
//         let answer = await new Provider(data).save();
//         res.status(201).json(answer);

//     }catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({msj:`ERROR: ${error.stack}`});
//     }
// }

// CREATE
const createProvider = async (req, res, next) => {
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
        let answer = await services.crearProvider(data);
        res.status(201).json(answer);

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
        next(error);
    }
}

// // READ (directamente sin services)
// const getProvider = async (req, res) => {
//         try {
//             const id = req.params.id;
//             let providers = id? await Provider.find({id},'-__v') : await Provider.find({},'-__v'); //{}
//             res.status(200).json(providers); // Respuesta de la API para 1 producto
//         }
//         catch (error) {
//             console.log(`ERROR: ${error.stack}`);
//             res.status(400).json({msj:`ERROR: ${error.stack}`});
//         }
// }

// READ
const getProvider = async (req, res) => {

    try {
        const id = req.params.id;
        let providers = id? await services.obtenerProviderPorId(id) : await services.obtenerTodosLosProviders(); //{}
        res.status(200).json(providers); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

// // UPATE (directamente sin services)
// const editProvider = (req, res) => {
//     res.status(200).send("Provider editado!");
// }

// UPATE
const editProvider = async (req, res) => {
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
        const updatedProvider = await services.actualizarProvider(id, data);
        res.status(200).json({ message: `Proveedor actualizado: ${updatedProvider.company_name}`, provider: updatedProvider });
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.status(400).json({ msj: `ERROR: ${error.message}` });
    }
};

// // DELETE (directamente sin services)
// const deleteProvider = (req, res) => {
//     res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
// }

// DELETE
const deleteProvider = async (req, res) => {
    const errors = validationResult(req);

    // Manejar errores de validación
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {
        const id = req.params.id;
        const deletedProvider = await services.eliminarProvider(id);

        if (!deletedProvider) {
            return res.status(404).json({ message: `Proveedor con ID ${id} no encontrado` });
        }

        res.status(200).json({ message: `Proveedor eliminado: ${deletedProvider.company_name}`, provider: deletedProvider });
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.status(400).json({ msj: `ERROR: ${error.message}` });
    }
};

module.exports = {
    createProvider,
    getProvider,
    editProvider,
    deleteProvider
}