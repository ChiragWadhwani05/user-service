import { Router } from "express";

import { getSelf, getUserByUsername } from "../controllers/user.controllers.js";

/**
 *
 * @returns {Router}
 */
function createUserV1Router() {
  const router = Router();

  router.route("/self").get(getSelf);

  router.route("/:username").get(getUserByUsername);

  return router;
}

export { createUserV1Router };
