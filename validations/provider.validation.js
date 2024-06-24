const { body, param } = require("express-validator");

const providerValidation = [
    body("company_name")
      .exists({ checkFalsy: true })
      .withMessage("Company Name is required")
      .isString()
      .withMessage("Company Name should be string"),
    body("CIF")
      .exists()
      .withMessage("CIF is required")
      .isString()
      .withMessage("CIF should be string")
      .isLength({ min: 9 })
      .withMessage("CIF should be at least 9 characters"),
    body("address")
      .exists({ checkFalsy: true })
      .withMessage("Adress is required")
      .isString()
      .withMessage("Address should be string"),
    body("url_web")
      .optional()
      .isString()
      .withMessage("URL Web should be string"),
    param("id")
        .optional()
        .isMongoId()
        .withMessage("Este Object ID no existe"),
  ];
  
  module.exports = {
    providerValidation
  };