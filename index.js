import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRouter from "./src/routes/auth.routes.js";
import imageRouter from "./src/routes/image.routes.js";

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: "10mb", extended: true }));
  server.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  server.use(cors());
  server.use(helmet());
  server.use(morgan("common"));

  //   server.use('/auth', authRouter);
  server.use("/images", imageRouter);
  server.get("/", (req, res) => {
    res.json({
      status: "success",
      message: "welcome to our API service",
    });
  });

  server.use("/auth", authRouter);

  // get env from .env file
  dotenv.config();
  // get port from .env
  const PORT = process.env.PORT || 5000;
  // start the server
  mongoose
    .connect(process.env.MONGOOSE_CONNECT_URL)
    .then(() =>
      server.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      )
    )
    .catch((error) => console.log(error.message));
};

init();
