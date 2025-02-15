import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// загружаю переменные из файла .env
dotenv.config();
// импортирую роутеры из модулей
import tbankRouter from "./routes/tbank";
import paymentRouter from "./routes/payment";
import clientRouter from "./routes/client";
import modalRouter from "./routes/paymentmodal";
import { envValidationMiddleware } from "./middleware/envVariablesCheck";
// переменные для порта и адреса для expressjs
const PORT = 3002;
// const INTERFACE = "localhost"; // dev
// const frontendOrigin = "http://localhost:5173"; //dev
const INTERFACE = "127.0.0.1"; // prod
const frontendOrigin = "https://chernuhino.ru"; // prod
// создаю веб-сервер >>>>>>>>>>>>>>
const app = express();
// Set up CORS to allow requests from your frontend (localhost:5173)
const corsOptions = {
  origin: frontendOrigin,  // Allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true,  // Allow cookies/credentials to be sent if necessary
};
app.use(cors(corsOptions));
app.use(envValidationMiddleware)
// подключаю миддлеваре >>>>>>>>>>>>>>
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// Описываю маршруты >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/tbank", tbankRouter);
app.use("/payment", paymentRouter);
app.use("/client", clientRouter);
app.use("/paymentmodal", modalRouter);
// определяю точку входа
async function main() {
  app.listen(PORT, INTERFACE, () => {
    console.log(`The server started on ${INTERFACE} port ${PORT}`);
  });
}
main();
