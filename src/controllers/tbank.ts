import { Request, Response } from "express";
// import { NodeSoapAccountResponse, PaymentArguments } from "../types/types";

// POST controller
export const tbankPostController = async function (req: Request, res: Response) {
  res.status(200).send()
  console.log(req.body);
};
