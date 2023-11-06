import * as z from "zod";

export const loginZodSchema = z.object({
  id: z.string({
    required_error: "User Id is required.",
  }),
  password: z.string({
    required_error: "Password is required.",
  }),
});
