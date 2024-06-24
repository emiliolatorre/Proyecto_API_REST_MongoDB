const productsController = require('../controllers/products.controllers');
const router = require('express').Router();
const { productValidation } = require("../validations/product.validation");

// GET http://localhost:3000/api/products
// GET http://localhost:3000/api/products/6
router.get("/:id?", productsController.getProduct);
/*
// POST http://localhost:3000/api/products

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
router.post("/", productValidation, productsController.createProduct);
router.put("/:id?", productValidation, productsController.editProduct);
router.delete("/:id?", productValidation, productsController.deleteProduct);

module.exports = router;