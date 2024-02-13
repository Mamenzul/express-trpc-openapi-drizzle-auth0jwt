import { auth } from "express-oauth2-jwt-bearer";
import express from "express";
import { appRouter } from "./api/root.js";
import { createTRPCContext } from "./api/trpc.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { openApiDocument } from "./openapi.js";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUERBASEURL,
  tokenSigningAlg: process.env.TOKENSIGNINALG,
});

app.use(cors());

app.use(
  "/api/trpc",
  checkJwt,
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.use(
  "/api",
  checkJwt,
  createOpenApiExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
    responseMeta: undefined,
    onError: undefined,
    maxBodySize: undefined,
  })
);

app.use("/", swaggerUi.serve);

const main = async () => {
  app.get("/", swaggerUi.setup(openApiDocument));
  app.listen(port, () => {
    console.log("listening on http://127.0.0.1:3000");
  });
};

main();
