import { createTRPCRouter } from "./trpc.js";
import { userRouter } from "./routers/user.js";

export const appRouter = createTRPCRouter({
  users: userRouter,
});

export type AppRouter = typeof appRouter;
