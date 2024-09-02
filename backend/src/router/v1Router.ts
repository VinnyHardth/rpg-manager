import { Router } from "express";

import statRouter from "../resources/stat/stat.router";
import systemRouter from "../resources/system/system.router";
import systemStatRouter from "../resources/systemStat/systemStat.router";
import campaignRouter from "../resources/campaign/campaign.router";
import userInCampaignRouter from "../resources/userInCampaign/userInCampaign.router";

const v1Router = Router();

v1Router.use(
  "/stats", // #swagger.tags = ['Stats']
  statRouter
);

v1Router.use(
  "/systems", // #swagger.tags = ['Systems']
  systemRouter
);

v1Router.use(
  "/systemStats", // #swagger.tags = ['System Stats']
  systemStatRouter
);

v1Router.use(
  "/campaigns", // #swagger.tags = ['Campaigns']
  campaignRouter
);

v1Router.use(
  "/usersInCampaign", // #swagger.tags = ['Users in Campaign']
  userInCampaignRouter
);

export default v1Router;
