import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z.string({ message: "Password is required" }),
});

export const SignUpSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email must be a valid email" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be minimum of 6 characters" }),
    confirmPassword: z.string({
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
