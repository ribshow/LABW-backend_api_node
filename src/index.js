import express from "express";
import cors from "cors";
import routes from "./Routes/User/routes.js";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use("/users", routes);
console.log("teste");
app.listen(5000,
    console.log("Server running on PORT 5000")
)