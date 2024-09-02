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
      id: randomUUID(),
      name: "Stat 1",
      description: "Description 1",
    },
    StatUpdate: {
      name: "Stat 1.1",
      description: "Description 1.1",
    },
    SystemCreate: {
      id: randomUUID(),
      name: "System 1",
      version: "v1",
    },
    SystemUpdate: {
      version: "v1.1",
    },
  },

  host: `${process.env.HOST}:${process.env.PORT}`,
};

const outputFile = "./src/_swagger/swagger-output.json";
const routes = ["./src/router/v1Router.ts"];

swaggerAutogen()(outputFile, routes, doc);
