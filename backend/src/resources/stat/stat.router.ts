import { Router } from "express";

import validateRequestBody from "../../middlewares/validateRequestBody";
import statController from "./stat.controller";
import statSchemas from "./stat.schemas";

const router = Router();

// read methods ---------------------------------------------------------------
router.get("/", statController.getAll);
router.get("/:id", statController.get);

// write methods --------------------------------------------------------------
router.post("/", validateRequestBody(statSchemas.post), statController.create);
router.put("/:id", validateRequestBody(statSchemas.put), statController.update);

// delete methods -------------------------------------------------------------
router.delete("/:id", statController.remove);

export default router;
