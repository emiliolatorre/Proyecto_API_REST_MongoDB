const mongoose = require('mongoose');

require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true 
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(cif){
                const regex = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
                if(regex.test(cif))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de CIF incorrecto"
        }
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web:{
        type: String, 
        required: true,
        validate: {
            validator: function(url){
                const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                if(regex.test(url))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de URL incorrecto"
        }
    }
};
// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

// DEMO Insertar un producto
// const pr = new Provider({
//     company_name: "Teatro Marquina",
//     CIF: "B40236882",
//     address: "Calle de Prim 11",
//     url_web:"https://www.tortillasmarquina.com"
// });

// // // Guardar en la BBDD
// pr.save()
// .then((data)=>console.log(data))
// .catch(err=>console.log(err))