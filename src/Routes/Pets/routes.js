import { application, Router } from "express";
import PetController from "../../Controllers/PetController.js";
import checkToken from "../../../helpers/verify-token.js";
import imageUpload from "../../../helpers/image-upload.js";
const routesPet = Router();

// ROTAS DO PET
routesPet.post("/store", checkToken, imageUpload.array("image"), PetController.create);
routesPet.get("/getAll", checkToken, PetController.getAll);

export default routesPet;