import { Router } from "express";
import { paymentController } from "../controllers/payment";

const paymentRouter = Router();

paymentRouter.post("/", paymentController);

export default paymentRouter;
