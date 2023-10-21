const {body} = require('express-validator')

const registerValidator = [
    body('name', 'the name field is required.').notEmpty(),
    body('name', 'the name field must be type of string.').isString(),
    body('email', 'the email field is required.').notEmpty(),
    body('email', 'the email field must be valid email.').isEmail(),
    body('password', 'the password field is required').notEmpty(),
    body('identity_type', 'the identity type field type is required').notEmpty(),
    body('identity_type', 'the identity type field must be type of string').isString(),
    body('identity_number', 'the identity number field type is required').notEmpty(),
    body('identity_number', 'the identity number field must be type of string').isString(),
    body('address', 'the address field type is required').notEmpty(),
    body('address', 'the address field must be type of string').isString(),
]

const loginValidator = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
]

module.exports = {
    registerValidator,
    loginValidator
}