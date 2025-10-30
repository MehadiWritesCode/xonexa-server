import Joi from 'joi';
export const signupValidation = (req, res, next) => {
        
    const {name,email,password,confirmPassword} = req.body;
    const signupSchema = Joi.object({
        name: Joi.string().min(3).max(30).required()
        .messages({
            'string.empty': `Name cannot be an empty field`,
            'string.min': `Name should have a minimum length of {#limit}`,
            'string.max': `Name should have a maximum length of {#limit}`,
            'any.required': `Name is a required field`
        }),
        email: Joi.string().email({ minDomainSegments: 2}).required()
        .messages({
            'string.empty': `Email cannot be an empty field`,
            'string.email': `Email must be a valid email address`,
            'any.required': `Email is a required field`
        }),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'))
          .required()
          .messages({
            'string.empty': `Password cannot be an empty field`,
            'string.pattern.base': `Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number`,
            'any.required': `Password is a required field`
        }),

        confirmPassword: Joi.ref('password')
    });

    const { error } = signupSchema.validate({ name, email, password, confirmPassword });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}