const mongoose = require('mongoose');

require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, sólo imágenes JPG o PNG"
        }
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Product = mongoose.model('Products', productSchema);

module.exports = Product;

// DEMO Insertar un producto
// const p = new Product(	{
//     title: "Tortilla - Marquina",
//     price: 1.80,
//     description:"La mejor tortilla de la zona en el Teatro Marquina",
//     provider: "6672f210a6923437ac8b8625"
// });

// // // // Guardar en la BBDD
// p.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err))

// Product.find({}).then(data=>console.log(data));