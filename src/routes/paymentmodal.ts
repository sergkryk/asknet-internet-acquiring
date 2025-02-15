import { Router } from "express";
import { paymentModalController } from "../controllers/paymentmodal";

const modalRouter = Router();

modalRouter.post("/", paymentModalController);

export default modalRouter;