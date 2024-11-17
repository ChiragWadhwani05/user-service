import { Router } from "express";

import {
  getSelf,
  getUserByUsername,
  getUsers,
} from "../controllers/user.controllers.js";

/**
 *
 * @returns {Router}
 */
function createUserV1Router() {
  const router = Router();

  router.route("/self").get(getSelf);

  router.route("/:username").get(getUserByUsername);

  router.route("/").get(getUsers);

  return router;
}

export { createUserV1Router };
