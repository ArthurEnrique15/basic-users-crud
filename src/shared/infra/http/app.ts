import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
// import swaggerUi from "swagger-ui-express";

import "@shared/container";
// import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import "@shared/infra/typeorm";

// import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };
