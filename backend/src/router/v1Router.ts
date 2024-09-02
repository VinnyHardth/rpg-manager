import { Router } from "express";

import statRouter from "../resources/stat/stat.router";
import systemRouter from "../resources/system/system.router";

const v1Router = Router();

v1Router.use(
  "/stats", // #swagger.tags = ['Stats']
  statRouter
);

v1Router.use(
  "/systems", // #swagger.tags = ['Systems']
  systemRouter
);

export default v1Router;
