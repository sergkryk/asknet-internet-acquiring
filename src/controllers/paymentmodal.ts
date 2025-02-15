import { Request, Response } from "express";
import { dbClient } from "../services/db/db-client";

// POST controller
const modalControllerConstructor = function () {
  const shownPaymentIdSet: Set<string> = new Set();
  const maxSize = 10000; // Лимит размера
  let counter = 0; // Счётчик для отслеживания количества добавленных элементов

  const resetSetIfNeeded = () => {
    if (counter >= maxSize) {
      shownPaymentIdSet.clear(); // Очистить Set
      counter = 0; // Сбросить счётчик
    }
  };

  const controller = async function (req: Request, res: Response) {
    try {
      
      // нужно проверить тело запроса
      
      const { status, amount, paymentId } = req.body;
      // Периодическая проверка и сброс, если нужно
      resetSetIfNeeded();
      if (shownPaymentIdSet.has(paymentId)) {
        return res.status(200).json({ status: "shown" });
      }
      const payment = await dbClient.getPayment(paymentId);
      shownPaymentIdSet.add(paymentId);
      counter++; // Увеличиваем счётчик при добавлении в Set
      res.status(200).json(payment);
    } catch (error) {
      res.status(400);
    }
  };

  return controller;
};

export const paymentModalController = modalControllerConstructor();
