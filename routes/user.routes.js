const express = require("express");
const { check, body } = require("express-validator/check");


const userController = require('../controller/user.controller');
const router = express.Router();

router.post(
    '/register', 
    [
        check('name').trim().notEmpty().withMessage("Name can't be empty!")
        .isAlpha().withMessage("Name must contain only alphabets!")
        .isLength({min: 5}).withMessage("Name must be minimum 5 characters long!"),
        
        check('email').notEmpty().withMessage("Email can't be empty!").isEmail().withMessage("Invalid Email!"),
        
        check('password').notEmpty().withMessage("Password cant be empty").isLength({min: 6}).withMessage("Password must be minimum 6 characters!")
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/)
        .withMessage('Must contain at least one symbol & one number!'),
        
        check('phoneNumber').notEmpty().withMessage("Phone number can't be empty!")
        .isNumeric().withMessage("Phone number must be only digits!").isLength({min:10, max:10}).withMessage("Invalid Phone Number, Check length!")
    ],  
    userController.userRegister
 );

router.post(
    '/login', 
    [
        check('email').notEmpty().withMessage("Cant be empty!").isEmail().withMessage("Invalid Email!"),
        check('password').notEmpty().withMessage("Password cant be empty").isLength({min: 6}).withMessage("Must be minimum 6 characters!")
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/)
        .withMessage('Must contain at least one symbol & one number!')
    ] , 
        userController.userLogin
    );

router.post("/otp",userController.registerOtp);

module.exports = router