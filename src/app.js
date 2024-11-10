import express from "express";
import { ApiError } from "./utils/apiError.js";
import { apiResponse } from "./utils/apiResponse.js";
import { createRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import cookieParser from "cookie-parser";

/**
 *
 * @returns {import("express").Express}
 */
function startApp() {
  const app = express();

  // Disable x-powered-by header from express
  app.disable("x-powered-by");

  // Body parser
  app.use(
    express.json({
      limit: "50mb",
      type: "application/json",
    })
  );

  app.use(cookieParser());

  // Health check endpoint
  app.get("/api/v1/user/api-health", (req, res) => {
    return res.status(200).json(apiResponse(200));
  });

  // API routes
  app.use("/api", createRouter());

  // Handle unknown endpoints
  app.use(
    "*",
    asyncHandler(() => {
      throw new ApiError(404, "Endpoint not found.");
    })
  );

  // Error handling middleware
  app.use(errorHandler);

  return app;
}

export { startApp };
