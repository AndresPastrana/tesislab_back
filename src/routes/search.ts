import { Request, Response, NextFunction, Router } from "express";
import { query } from "express-validator";
import SearchController from "../controllers/search.js"; // Adjust this path
import { Allowedcollections } from "../const.js";
import { validateRequest } from "../middleware/validate.js";

export const router: Router = Router();

// Validation middleware for the search endpoint
const validateSearch = [
  query("collection", "Invalid collection").isIn(
    Object.values(Allowedcollections)
  ),
  query("term", "Invalid  term")
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .isLength({ min: 1 }),
];

// Search endpoint
router.get("/", [...validateSearch, validateRequest], SearchController.search);
