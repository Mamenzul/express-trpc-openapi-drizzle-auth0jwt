/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { OpenApiMeta } from "trpc-openapi";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

type Jwt_decoded = {
  iss: string;
  sub: string;
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  scope: string;
};
export const createTRPCContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  let userId: number | null = null;

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]!;
      const token_decoded = jwt.decode(token) as Jwt_decoded;
      userId = +token_decoded.sub.split("|")[1]!;
    }
  } catch (cause) {
    console.error(cause);
  }
  return { userId, db };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const procedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      message: "User not found",
      code: "UNAUTHORIZED",
    });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});
