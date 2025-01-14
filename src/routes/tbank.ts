import { Router } from "express";
import { tbankPostController } from "../controllers/tbank";

const tbankRouter = Router();
// dealerRouter.use(corsResolver);
// dealerRouter.use(tokenVerification);

tbankRouter.post("/", tbankPostController);

export default tbankRouter;
