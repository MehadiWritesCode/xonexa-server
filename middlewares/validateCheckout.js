import Joi from "joi";

export const validateCheckout = (req, res, next) => {
  const { formData } = req.body;

  const checkoutSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be valid",
        "any.required": "Email is required",
      }),

    fullName: Joi.string()
      .min(3)
      .required()
      .messages({
        "string.empty": "Full name cannot be empty",
        "string.min": "Full name must be at least 3 characters long",
        "any.required": "Full name is required",
      }),

    address: Joi.string()
      .required()
      .messages({
        "string.empty": "Address cannot be empty",
        "any.required": "Address is required",
      }),

    city: Joi.string().allow("", null), 

    zip: Joi.string()
      .pattern(/^[0-9]{4,10}$/)
      .allow("", null)
      .messages({
        "string.pattern.base": "ZIP must be between 4–10 digits",
      }),

    cardNumber: Joi.string()
      .creditCard()
      .required()
      .messages({
        "string.empty": "Card number cannot be empty",
        "string.creditCard": "Card number is invalid",
        "any.required": "Card number is required",
      }),

    expDate: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) 
      .required()
      .messages({
        "string.empty": "Expiration date cannot be empty",
        "string.pattern.base": "Expiration date must be in MM/YY format",
        "any.required": "Expiration date is required",
      }),

    cvv: Joi.string()
      .pattern(/^[0-9]{3,4}$/)
      .required()
      .messages({
        "string.empty": "CVV cannot be empty",
        "string.pattern.base": "CVV must be 3 or 4 digits",
        "any.required": "CVV is required",
      }),
  });

  const { error } = checkoutSchema.validate(formData, { abortEarly: false });

  if (error) {

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  next();
};
