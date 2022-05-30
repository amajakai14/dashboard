import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/user", userRouter);

const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${5000 /*PORT*/}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
