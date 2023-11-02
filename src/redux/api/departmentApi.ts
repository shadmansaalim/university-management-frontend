// Imports
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";
import { IDepartment, IMeta } from "@/types";

// Constant for this api routes
const DEPARTMENT_URL = "/management-departments";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all requested departments data
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

    // GET single department by id
    department: build.query({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.department],
    }),

    // CREATE new department
    addDepartment: build.mutation({
      query: (departmentData) => ({
        url: DEPARTMENT_URL,
        method: "POST",
        data: departmentData,
      }),
      invalidatesTags: [TAG_TYPES.department],
    }),
    // UPDATE single department by id
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.department],
    }),
    // DELETE single department by id
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.department],
    }),
  }),
});

export const {
  useDepartmentsQuery,
  useDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
