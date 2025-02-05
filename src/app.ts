import express from "express";
import cors from "cors";
// import NodeSoap from "./soap/soap";
import dotenv from "dotenv";
// загружаю переменные из файла .env
dotenv.config();
// импортирую роутеры из модулей
import tbankRouter from "./routes/tbank";
import paymentRouter from "./routes/payment";
import clientRouter from "./routes/client";
// import { handleError } from "./utils/errorHadler";
// переменные для порта и адреса для expressjs
const PORT = 3002;
const INTERFACE = "localhost";
const frontendOrigin = "http://localhost:5173";
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
// подключаю миддлеваре >>>>>>>>>>>>>>
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// Описываю маршруты >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/tbank", tbankRouter);
app.use("/payment", paymentRouter);
app.use("/client", clientRouter);
// определяю точку входа
async function main() {
  app.listen(PORT, INTERFACE, () => {
    console.log(`The server started on ${INTERFACE} port ${PORT}`);
  });

  try {
    // const soap = await NodeSoap.init();
    // const login = await soap.login({
    //   login: process.env.BILLING_LOGIN || "",
    //   pass: process.env.BILLING_PASS || "",
    // });
    // const tarifs = await soap.getTarifs();
    // console.log(tarifs);

    // const newPayment = await soap.submitPayment({
    //   agrmid: 2930,
    //   amount: 10,
    //   receipt: '5746329733',
    // });
    // console.log(newPayment);

    // const canceledPayment = await soap.cancelPayment({
    //     agrmid: 2930,
    //     recordid: 46112,
    //     receipt: '5746329733',
    //   });
    // console.log(canceledPayment);

  } catch (error) {
    // handleError(error);
  }
}

main();
