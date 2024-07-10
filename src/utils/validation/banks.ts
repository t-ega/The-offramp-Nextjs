import { z } from "zod";

export const BanksSchema = z
  .object({
    code: z.string(),
    name: z.string(),
  })
  .array();

export type BankType = z.infer<typeof BanksSchema>;
