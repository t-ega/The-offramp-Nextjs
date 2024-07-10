import { z } from "zod";

const CurrencySchema = z
  .object({
    short_name: z.string(),
    currency: z.string(),
    display_name: z.string(),
  })
  .transform((o) => ({
    shortName: o.short_name,
    currency: o.currency,
    display_name: o.display_name,
  }));

export const CurrencyListSchema = CurrencySchema.array();
export type CurrencyType = z.infer<typeof CurrencySchema>;
