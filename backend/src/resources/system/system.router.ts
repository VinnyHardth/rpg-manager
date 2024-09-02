import { Router } from "express";

import validateRequestBody from "../../middlewares/validateRequestBody";
import systemController from "./system.controller";
import systemSchemas from "./system.schemas";

const router = Router();

// read methods ---------------------------------------------------------------
router.get("/", systemController.getAll);
router.get("/:id", systemController.get);

// write methods ---------------------------------------------------------------
router.post(
  "/",
  validateRequestBody(systemSchemas.post),
  systemController.create
);
router.put(
  "/:id",
  validateRequestBody(systemSchemas.put),
  systemController.update
);
// delete methods -------------------------------------------------------------
router.delete("/:id", systemController.remove);

export default router;
