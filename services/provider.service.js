const Provider = require('../models/provider.model');

// [GET] http://localhost:3000/providers Retorna un objeto con los datos de todos los providers. Retorna un status 200. Payload {[{datos_de_provider}, {datos_de_provider}, ...]}
const obtenerTodosLosProviders = async () => {
    return await Provider.find();
};

// [GET] http://localhost:3000/providers Retorna un objeto con los datos de todos los providers. Retorna un status 200. Payload {[{datos_de_provider}, {datos_de_provider}, ...]}
const obtenerProviderPorId = async (id) => {
    return await Provider.findById(id);
};

// [POST] http://localhost:3000/providers Se envía en el body los datos del proveedor a crear y retorna un status 201. Payload {message: "proveedor creado", provider:{datos_del_proveedor_creado}}.
const crearProvider = async (datosProveedor) => {
    const provider = new Provider(datosProveedor);
    return await provider.save();
};

// [PUT] http://localhost:3000/providers Se envía en el body los datos del proveedor a editar y retorna un status 200. Payload {message: "proveedor actualizado: Adidas", provider:{datos_del_proveedor_editado}}.
const actualizarProvider = async (id, datosProveedor) => {
    return await Provider.findByIdAndUpdate(id, datosProveedor, { new: true });
};

// [DELETE] http://localhost:3000/providers Se envía en el body el título del proveedor a borrar y retorna un status 200. Payload {message: "Se ha borrado el proveedor: Nintendo"}.
const eliminarProvider = async (id) => {
    return await Provider.findByIdAndDelete(id);
};

module.exports = {
    obtenerTodosLosProviders,
    obtenerProviderPorId,
    crearProvider,
    actualizarProvider,
    eliminarProvider
};