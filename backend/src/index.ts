import { v4 as uuidv4 } from "uuid";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";

import v1Router from "./router/v1Router";
import swaggerFile from "./_swagger/swagger-output.json";
// import validarEnv from "./utils/validarEnv";

declare module "express-session" {
  interface SessionData {
    uid: string;
  }
}

dotenv.config();
// validarEnv();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:4000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  session({
    genid: () => uuidv4(),
    secret: "StMf#She#mj34se#dSm",
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   sameSite: "none",
    //   secure: true,
    // },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(v1Router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
