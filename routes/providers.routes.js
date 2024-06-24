const providerController = require('../controllers/provider.controllers');
const router = require('express').Router();
const { providerValidation } = require("../validations/provider.validation");

// GET http://localhost:3000/api/providers
// GET http://localhost:3000/api/providers/6
router.get("/:id?", providerController.getProvider);
/*
// POST http://localhost:3000/api/providers

A enviar por Body:
{
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
    "rate": 4.6,
    "count": 400
    }
}
*/
router.post("/", providerValidation, providerController.createProvider);
router.put("/:id?", providerValidation, providerController.editProvider);
router.delete("/:id?", providerValidation, providerController.deleteProvider);

module.exports = router;