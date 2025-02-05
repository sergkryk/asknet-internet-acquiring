import { Router } from "express";
import { clientPostController, clientGetController } from "../controllers/client";

const clientRouter = Router();
clientRouter.get("/", clientGetController);
clientRouter.post("/", clientPostController);

export default clientRouter;
