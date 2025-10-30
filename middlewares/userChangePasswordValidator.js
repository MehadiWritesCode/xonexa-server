import Joi from 'joi';

export const userChangePasswordValidator = (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const passwordSchema = Joi.object({
        currentPassword: Joi.string()
            .required()
            .messages({
                'string.empty': 'Current password cannot be empty',
                'any.required': 'Current password is required'
            }),
        newPassword: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'))
            .required()
            .messages({
                'string.empty': 'New password cannot be empty',
                'string.pattern.base': 'New password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 number',
                'any.required': 'New password is required'
            })
    });

    const { error } = passwordSchema.validate({ currentPassword, newPassword });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({ message: 'New password must be different from current password' });
    }

    next();
};
