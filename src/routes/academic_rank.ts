import express, { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { RangoAcademico } from "../const.js";
import AcademicRankController from "../controllers/academic_rank.js";
import { validateRequest } from "../middleware/validate.js";
import { isValidToken } from "../middleware/jwt.js";

export const router: Router = express.Router();

// Validation middleware for ID parameter
const validateIdParam = param("id")
  .isMongoId()
  .withMessage("Invalid ID format");

// Validation middleware for rank property
const validateRank = body("rank")
  .isIn(Object.values(RangoAcademico))
  .withMessage("Invalid academic rank");

// Routes
router.post(
  "/",
  isValidToken,
  validateRank,
  validateRequest,
  AcademicRankController.createAcademicRank
);

router.get("/", isValidToken, AcademicRankController.getAllAcademicRanks);

router.get(
  "/:id",
  isValidToken,
  validateIdParam,
  validateRequest,
  AcademicRankController.getAcademicRankById
);

router.put(
  "/:id",
  isValidToken,
  validateIdParam,
  validateRank,
  validateRequest,
  AcademicRankController.updateAcademicRank
);

router.delete(
  "/:id",
  validateIdParam,
  validateRequest,
  AcademicRankController.deleteAcademicRank
);
