import { Router } from "express";
import { body, param } from "express-validator";
import { CourtsController } from "../controllers/courts.js";
import { isValidDoc } from "../middleware/dbValidators.js";
import { ModelCourt } from "../models/Court.js";
import { validateRequest } from "../middleware/validate.js";
import { CourtRole, UserRole } from "../const.js";
import { ModelProfesor } from "../models/Profesor.js";

import { isValidToken } from "../middleware/jwt.js";
import { protectRouteByRole } from "../middleware/protectRouteByRole.js";
import { Types } from "mongoose";

export const router: Router = Router();

const authValidations = [isValidToken, protectRouteByRole([UserRole.Admin])];
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
    .withMessage("Roles can not be repeated in the court"),
  // .custom(async (members) => {
  //   const results = await Promise.all(
  //     members.map(async ({ profesor: p }: { profesor: string }) => {
  //       const match = await ModelCourt.findOne({
  //         members: { $elemMatch: { profesor: new Types.ObjectId(p) } },
  //       });

  //       return !!match; // Converts match to a boolean
  //     })
  //   );

  //   if (results.includes(true))
  //     throw new Error("A profesor can be in just one court");
  //   return true;
  // }),
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
  [...authValidations, ...validateCreateCourt, validateRequest],
  CourtsController.createCourt
);
router.put(
  "/:courtId",
  [...authValidations, ...validateCourtId, ...validateUpdateCourt],
  CourtsController.updateCourt
);

router.get(
  "/",
  [...authValidations, validateRequest],
  CourtsController.getAllCourts
);
router.get(
  "/:courtId",
  [
    authValidations[0],
    protectRouteByRole([UserRole.Profesor, UserRole.Admin]),
    ...validateCourtId,
  ],
  CourtsController.getCourtById
);

//TODO: Validate that te court exist
router.delete(
  "/:courtId",
  param("courtId").isMongoId().withMessage("Invalid Court ID"),
  CourtsController.deleteCourt
);
