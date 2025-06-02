import express from "express";
import cors from "cors";
import routes from "./Routes/User/routes.js";
import routesPet from "./Routes/Pets/routes.js";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }), express.static("./src/public"));
app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);

app.use("/users", routes);
app.use("/pets", routesPet);

app.listen(5000, console.log("Server running on PORT 5000"));
