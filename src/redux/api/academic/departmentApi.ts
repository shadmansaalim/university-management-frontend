// Imports

import { IAcademicDepartment, IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/academic-departments";

export const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all academic departments api endpoint
    academicDepartments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
        return {
          academicDepartments: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.academicDepartment],
    }),

    // GET single academic department by id api endpoint
    academicDepartment: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.academicDepartment],
    }),

    // CREATE academic department api endpoint
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.academicDepartment],
    }),

    // UPDATE academic department api endpoint
    updateAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.academicDepartment],
    }),

    // DELETE academic department api endpoint
    deleteAcademicDepartment: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.academicDepartment],
    }),
  }),
});

export const {
  useAddAcademicDepartmentMutation,
  useAcademicDepartmentsQuery,
  useAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
} = academicDepartmentApi;
