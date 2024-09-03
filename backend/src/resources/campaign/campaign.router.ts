import { Router } from "express";

import validateRequestBody from "../../middlewares/validateRequestBody";
import campaignController from "./campaign.controller";
import campaignSchemas from "./campaign.schemas";

const router = Router();

// read methods ---------------------------------------------------------------
router.get("/", campaignController.getAll);
router.get("/:id", campaignController.get);
router.get("/user/:userId", campaignController.getByUserId);
router.get("/system/:systemId", campaignController.getBySystemId);

// write methods ---------------------------------------------------------------
router.post(
  "/",
  validateRequestBody(campaignSchemas.post),
  campaignController.create
);

router.put(
  "/:id",
  validateRequestBody(campaignSchemas.put),
  campaignController.update
);

// delete methods -------------------------------------------------------------
router.delete("/:id", campaignController.remove);

export default router;
