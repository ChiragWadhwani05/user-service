import { Router } from "express";

function createRouter() {
  const router = Router();

  router.use("/v1", createV1Router());

  return router;
}

function createV1Router() {
  const router = Router();

  return router;
}

export { createRouter };
