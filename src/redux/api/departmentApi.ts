// Imports
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";
import { IDepartment, IMeta } from "@/types";

// Constant for this api routes
const DEPARTMENT_URL = "/management-departments";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    departments: build.query({
      query: (arg: Record<string, any>) => ({
        url: DEPARTMENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDepartment[], meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.department],
    }),
    addDepartment: build.mutation({
      query: (departmentData) => ({
        url: DEPARTMENT_URL,
        method: "POST",
        data: departmentData,
      }),
      invalidatesTags: [TAG_TYPES.department],
    }),
  }),
});

export const { useDepartmentsQuery, useAddDepartmentMutation } = departmentApi;
