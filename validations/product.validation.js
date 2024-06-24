const { body, param } = require("express-validator");

const productValidation = [
    body("title")
      .exists({ checkFalsy: true })
      .withMessage("Title is required")
      .isString()
      .withMessage("Title should be string"),
    body("price")
      .exists()
      .withMessage("Price is required")
      .isString()
      .withMessage("Price should be string")
      .isLength({ min: 1 })
      .withMessage("Price should be at least 1 character"),
    body("description")
    .exists()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description should be string")
      .isLength({ min: 10 })
      .withMessage("Description should be at least 10 character"),
    body("image")
      .optional()
      .isString()
      .withMessage("Image should be string"),
    param("id")
        .optional()
        .isMongoId()
        .withMessage("Este Object ID no existe"),
  ];
  
  module.exports = {
    productValidation
  };