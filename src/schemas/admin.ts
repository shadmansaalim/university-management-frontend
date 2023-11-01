import { bloodGroupData, gendersData } from "@/constants/global";
import * as z from "zod";

export const createAdminSchema = z.object({
  password: z.string().optional(),
  admin: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    gender: z.enum([...gendersData] as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string({
      required_error: "Date of birth is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    contactNo: z.string({
      required_error: "Contact number is required",
    }),
    emergencyContactNo: z.string({
      required_error: "Emergency contact number is required",
    }),
    bloodGroup: z.enum([...bloodGroupData] as [string, ...string[]]).optional(),
    presentAddress: z.string({
      required_error: "Present address is required",
    }),
    permanentAddress: z.string({
      required_error: "Permanent address is required",
    }),
    designation: z.string({
      required_error: "Designation is required",
    }),
    managementDepartment: z.string({
      required_error: "Management department is required",
    }),
    profileImage: z.string().optional(),
  }),
});
