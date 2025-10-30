import Joi from 'joi';
export const loginValidator =(req,res,next) =>{
        const {email,password} = req.body;
        const loginSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2}).required()
            .messages({
                'string.empty': `Email cannot be an empty field`,
                'string.email': `Email must be a valid email address`,
                'any.required': `Email is a required field`
            }),

            password: Joi.string().min(6).required()
            .messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password must be at least 6 characters long`,
                'any.required': `Password is a required field`
            })
        });
        const {error} = loginSchema.validate({email,password});
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        next();
}