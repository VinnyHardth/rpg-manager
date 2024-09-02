import { Router } from "express";

import validateRequestBody from "../../middlewares/validateRequestBody";
import systemStatController from "./systemStat.controller";
import systemStatSchemas from "./systemStat.schemas";

const router = Router();

// read methods ---------------------------------------------------------------
router.get("/:id", systemStatController.get);
router.get("/system/:id", systemStatController.getBySystemId);

// write methods ---------------------------------------------------------------
router.post(
  "/",
  validateRequestBody(systemStatSchemas.post),
  systemStatController.create
);

router.put(
  "/:id",
  validateRequestBody(systemStatSchemas.put),
  systemStatController.update
);

// delete methods -------------------------------------------------------------
router.delete("/:id", systemStatController.remove);

export default router;
