import { createContext } from "react";
import { CheckoutDetails } from "../types";

export const CheckoutContext = createContext<CheckoutDetails | undefined>({
  account_name: "",
  account_number: "",
  bank_code: "",
  currency_price: 0,
  from_currency: "",
  processing_fee: 0,
  receipient_email: "",
  receive_amount: 0,
  send_amount: 0,
});
