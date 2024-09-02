import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
import { randomUUID } from "crypto";

dotenv.config();

const doc = {
  info: {
    title: "API",
    description: "API Documentation",
  },

  definitions: {
    StatCreate: {
      name: "Stat 1",
      description: "Description 1",
    },
    StatUpdate: {
      name: "Stat 1.1",
      description: "Description 1.1",
    },
    SystemCreate: {
      name: "System 1",
      version: "v1",
    },
    SystemUpdate: {
      version: "v1.1",
    },
    SystemStatCreate: {
      systemId: randomUUID(),
      statId: randomUUID(),
    },
    SystemStatUpdate: {
      systemId: randomUUID(),
      statId: randomUUID(),
    },
    CampaignCreate: {
      name: "Campaign 1",
      description: "Description 1",
      userId: randomUUID(),
      systemId: randomUUID(),
    },
    CampaignUpdate: {
      name: "Campaign 1.1",
      description: "Description 1.1",
      userId: randomUUID(),
      systemId: randomUUID(),
    },
  },

  host: `${process.env.HOST}:${process.env.PORT}`,
};

const outputFile = "./src/__swagger__/swagger-output.json";
const routes = ["./src/router/v1Router.ts"];

swaggerAutogen()(outputFile, routes, doc);
