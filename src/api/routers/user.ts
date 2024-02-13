import { eq } from "drizzle-orm";
import { createTRPCRouter, procedure } from "../trpc.js";
import { z } from "zod";
import { users } from "../../schema.js";

export const userRouter = createTRPCRouter({
  sayHello: procedure
    .meta({
      openapi: { method: "GET", path: "/say-hello/", protect: true },
    })
    .input(z.void())
    .output(z.object({ hello: z.string() }))
    .query(async ({ ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.userId),
      });
      return { hello: `Hello ${user!.email}!` };
    }),
});
