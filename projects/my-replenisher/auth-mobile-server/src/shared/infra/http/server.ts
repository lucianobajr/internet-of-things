import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";

import { AppError } from "../../errors/AppError";

import "../../container";

const app = express();

app.use(express.json());

app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error = ${err.message}`,
  });
});

app.listen(process.env.PORT || 3333, () =>
  console.log("Server ir running! 🔥")
);
