import express from "express";
import dotenv from "dotenv";
// загружаю переменные из файла .env
dotenv.config();
// импортирую роутеры из модулей
import tbankRouter from "./routes/tbank";
import paymentRouter from "./routes/payment";
import NodeSoap from "./soap/soap";
import { handleError } from "./utils/errorHadler";
// переменные для порта и адреса для expressjs
const PORT = 3002;
const INTERFACE = "127.0.0.1";
// создаю веб-сервер >>>>>>>>>>>>>>
const app = express();
// подключаю миддлеваре >>>>>>>>>>>>>>
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(express.static(path.join(__dirname, "public")));
// Описываю маршруты >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/tbank", tbankRouter);
app.use("/payment", paymentRouter);
// определяю точку входа
async function main() {
  app.listen(PORT, INTERFACE, () => {
    console.log(`The server started on ${INTERFACE} port ${PORT}`);
  });

  try {
    const soap = await NodeSoap.init();
    const login = await soap.loginAsync({
      login: process.env.BILLING_LOGIN || "",
      pass: process.env.BILLING_PASS || "",
    });
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
    handleError(error);
  }
}

main();
