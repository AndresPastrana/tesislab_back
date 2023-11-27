import { validateRequest } from "./../middleware/validate.js";
import { Router } from "express";
import { body, ValidationChain } from "express-validator";
import { AuthController } from "../controllers/ auth.js";

const loginValidations: ValidationChain[] = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isString()
    .withMessage("Password must be a string")
    .escape(),
];

export const router: Router = Router();

// Route for user login
router.post(
  "/login",
  [...loginValidations, validateRequest],
  AuthController.loginUser
);
