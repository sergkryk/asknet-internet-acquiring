import express from "express";
import dotenv from "dotenv";
// загружаю переменные из файла .env
dotenv.config();
// импортирую роутеры из модулей
import tbankRouter from "./routes/tbank";
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
// app.use("/client", clientRouter);
// app.use("/psb", psbRouter);
// app.use("/paydayreport", paydayRouter);
// app.use("/postoffice", postOfficeRouter);
// app.use("/dealer", dealerRouter);
// app.use("/", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "views", "404.html"));
// });
async function main() {
  // запуск http сервер >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  app.listen(PORT, INTERFACE, () => {
    console.log(`The server started on ${INTERFACE} port ${PORT}`);
  });
}

main();


