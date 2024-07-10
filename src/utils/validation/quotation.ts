import { z } from "zod";

export const QuotationSchema = z.object({
  quote_type: z.enum(["send", "receive"]).optional(),
  vol: z.number(),
  currency: z.string().optional(),
});
