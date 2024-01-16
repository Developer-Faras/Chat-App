const { check, validationResult } = require('express-validator');
const USER = require('../../models/UserModel');
const createHttpError = require('http-errors');
const { unlink } = require('fs');

// Add User Validator
const AddUserValidator = [
    check('name')
        .trim()
        .isLength({min: 1})
        .withMessage('Name Is Required')
        .isAlpha('en-US', {ignore: ' -'})
        .withMessage('Name Contains Only Alphabet'),
    check('email')
        .trim()
        .isLength({min: 1})
        .withMessage('Email Is Required')
        .isEmail()
        .withMessage('Invalid Email Address')
        .toLowerCase()
        .custom(async (value) => {
            try {
                const result = await USER.findOne({email: value});
                if(result){
                    throw createHttpError('Email Is Allready Use');
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('phone')
        .trim()
        .isLength({min: 1})
        .withMessage('Phone Is Required')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile Number Sholud Be A Bangladeshi Number')
        .custom(async (value) => {
            try {
                const result = await USER.findOne({phone: value}).countDocuments();
                if(result > 0){
                    throw createHttpError('Phone Is Allready Use');
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('password')
        .trim()
        .isLength({min: 1})
        .withMessage('Password Is Required')
        .isStrongPassword()
        .withMessage('Password Contains At Least 8 Caracter And Shold Be 1 Lowercase, 1 Uppercase, 1 Number And 1 Symbol')
];

// Add User Validation Handler
const AddUserValidationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if(Object.keys(mappedError).length === 0){
        next();
    }else{
        if(req.files.length > 0){
            const filePath = req.files[0].path;
            unlink(filePath, (err) => {
                mappedError.common = {
                    msg: 'Uploaded File Are Not Deleted'
                }
            });
        }

        res.status(500).json({
            errors: mappedError
        });
    }
}

module.exports = {
    AddUserValidator,
    AddUserValidationErrorHandler
};