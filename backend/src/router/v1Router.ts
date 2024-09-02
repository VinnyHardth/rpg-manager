import { Router } from "express";

import statRouter from "../resources/stat/stat.router";

const v1Router = Router();

v1Router.use(
  "/stats", // #swagger.tags = ['Stats']
  statRouter
);

export default v1Router;
