import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRouter from "./src/routes/auth.routes.js";
import imageRouter from "./src/routes/image.routes.js";
import cloudinaryRouter from "./src/routes/cloudinary.routes.js";
import { verifyTokenAdmin, verifyTokenAndAuthorization } from "./src/middleware/auth.middleware.js";

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: "15mb", extended: true }));
  server.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
  server.use(cors({origin: true, credentials: true}));
  server.use(helmet());
  server.use(morgan("common"));

  server.get("/", (req, res) => {
    res.send("Welcome to shiroplane API service!");
  });
  //   server.use('/auth', authRouter);
  server.use("/images", imageRouter);
  server.use("/auth", authRouter);
  server.use("/cloudinary", cloudinaryRouter);
  // test protected
  server.get("/protected/:id", verifyTokenAndAuthorization, (req, res) => {
    // Access the authenticated user from req.user
    res.status(200).json({ message: 'Access granted to protected resource' });
  });
  server.get("/dashboard/:id", verifyTokenAndAuthorization, (req, res) => {
    // Access the authenticated user from req.user
    res.status(200).json({ message: 'Access granted to protected resource' });
  });

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
