import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./api/root.js";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "TEAMFINDER API",
  description: "TeamFinder API for dev purposes",
  version: "1.0.0",
  baseUrl: "api/",
});
