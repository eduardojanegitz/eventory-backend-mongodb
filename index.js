import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import itemsRoutes from "./routes/items.js";
import tagsRoutes from "./routes/tags.js";

import router from "./routes/router.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/general", generalRoutes);
app.use("/items", itemsRoutes);
app.use("/tags", tagsRoutes);
app.use("/client", clientRoutes);

app.use("/api", router);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} didn't connect`));
