import { Router } from "express";

import validateRequestBody from "../../middlewares/validateRequestBody";
import userInCampaignController from "./userInCampaign.controller";
import userInCampaignSchemas from "./userInCampaign.schemas";
const router = Router();

// read methods ---------------------------------------------------------------
router.get("/:id", userInCampaignController.get);
router.get("/user/:id", userInCampaignController.getByUserId);
router.get("/campaign/:id", userInCampaignController.getByCampaignId);

// write methods ---------------------------------------------------------------
router.post(
  "/",
  validateRequestBody(userInCampaignSchemas.post),
  userInCampaignController.create
);

router.put(
  "/:id",
  validateRequestBody(userInCampaignSchemas.put),
  userInCampaignController.update
);

// delete methods -------------------------------------------------------------
router.delete("/:id", userInCampaignController.remove);

export default router;
