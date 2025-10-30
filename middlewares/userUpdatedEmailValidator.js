import Joi from 'joi';

export const userUpdatedEmailValidator = (req, res, next) => {
  const { email } = req.body; 

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is a required field',
      }),
  });

  const { error } = schema.validate({ email });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
