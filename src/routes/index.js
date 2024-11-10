import { Router } from "express";
import { createUserV1Router } from "./user.routes.js";

function createRouter() {
  const router = Router();

  router.use("/v1", createV1Router());

  return router;
}

function createV1Router() {
  const router = Router();

  router.use("/user", createUserV1Router());

  return router;
}

export { createRouter };
