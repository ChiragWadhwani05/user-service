import { Router } from "express";

import { getSelf, getUser } from "../controllers/user.controllers.js";

/**
 *
 * @returns {Router}
 */
function createUserV1Router() {
  const router = Router();

  router.route("/getSelf").get(getSelf);

  router.route("/getUser").get(getUser);

  return router;
}

export { createUserV1Router };
