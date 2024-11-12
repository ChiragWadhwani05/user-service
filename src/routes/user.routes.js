import { Router } from "express";

import { getSelf } from "../controllers/user.controllers.js";

/**
 *
 * @returns {Router}
 */
function createUserV1Router() {
  const router = Router();

  router.route("/getSelf").get(getSelf);

  return router;
}

export { createUserV1Router };
