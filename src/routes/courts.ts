import express, { Router } from "express";
import { body, param } from "express-validator";
import { CourtsController } from "../controllers/courts.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelCourt } from "../models/Court.js";
import { validateRequest } from "../middleware/validate.js";
import { CourtRole } from "../const.js";
import { ModelProfesor } from "../models/Profesor.js";
import { ModelTesisProject } from "../models/TesisProject.js";
import { Schema, Types } from "mongoose";

export const router: Router = Router();

// TODO:
// Validate that each profesor is  not in any other court
const validateCreateCourt = [
  body("name")
    .trim()
    .escape()
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 1 })
    .withMessage("Name is required"),

  body("members")
    .isArray({ min: Object.values(CourtRole).length })
    .withMessage(
      `The courts needs to have a least ${
        Object.values(CourtRole).length
      } members: ${Object.values(CourtRole).join(", ")} `
    ),
  body("members.*.profesor")
    .exists({ values: "falsy" })
    .withMessage("profesor id is required")
    .isMongoId()
    .withMessage("invalid id format")
    .custom((profesorId) => isValidDoc(profesorId, ModelProfesor))
    .withMessage("Profesor not found"),
  body("members.*.role")
    .exists({ values: "falsy" })
    .withMessage("role is required")
    .isIn(Object.values(CourtRole))
    .withMessage("Invalid role"),
  body("members")
    .if((members) => members.length === 4)
    .custom((members) => {
      const rolesSet = new Set();

      for (const member of members) {
        if (rolesSet.has(member.role)) {
          // Role is repeated, return false
          return false;
        }
        rolesSet.add(member.role);
      }
      return true;
    })
    .withMessage("Roles can not be repeated in the court")
    .custom(async (members) => {
      const results = await Promise.all(
        members.map(async ({ profesor: p }: { profesor: string }) => {
          const match = await ModelCourt.findOne({
            members: { $elemMatch: { profesor: new Types.ObjectId(p) } },
          });

          return !!match; // Converts match to a boolean
        })
      );

      if (results.includes(true))
        throw new Error("A profesor can be in just one court");
      return true;
    }),
];

const validateUpdateCourt = [
  param("courtId").isMongoId().withMessage("Invalid Court ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character"),
  // Add other validation rules for your properties
];

const validateCourtId = [
  param("id")
    .exists({ values: "falsy" })
    .withMessage("id is required in the params")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((courtId) => isValidDoc(courtId, ModelCourt))
    .withMessage(`Court not found `),
];

// Routes
router.post(
  "/",
  [...validateCreateCourt, validateRequest],
  CourtsController.createCourt
);
router.put("/:courtId", validateUpdateCourt, CourtsController.updateCourt);
router.get(
  "/:courtId",
  param("courtId").isMongoId().withMessage("Invalid Court ID"),
  CourtsController.getCourtById
);

//TODO: Validate that te court exist
router.delete(
  "/:courtId",
  param("courtId").isMongoId().withMessage("Invalid Court ID"),
  CourtsController.deleteCourt
);
