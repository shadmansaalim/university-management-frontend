import * as z from "zod";

export const createManagementDepartmentSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});
