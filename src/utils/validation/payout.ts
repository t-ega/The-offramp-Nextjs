import { z } from "zod";

export const PayoutSchema = z.object({
  receipient_email: z.string().email(),
  from_currency: z.string(),
  from_amount: z.coerce.number().positive().finite(),
  bank_details: z.object({
    bank_code: z.string().min(3).max(5),
    account_number: z.string().min(10),
  }),
});

export type PayoutPayload = z.infer<typeof PayoutSchema>;
