import { Router } from "express";
import { tbankPostController } from "../controllers/tbank";

const tbankRouter = Router();
tbankRouter.post("/", tbankPostController);

export default tbankRouter;
