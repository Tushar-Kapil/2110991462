import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const start = async () => {
  app.listen(8000, () => {
    console.log("Server Running On PORT 8000");
  });
};

start();
