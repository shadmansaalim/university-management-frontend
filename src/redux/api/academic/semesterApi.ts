// Imports

import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { TAG_TYPES } from "@/redux/tag-types";
import { IAcademicSemester } from "../../../types/common";

const ENDPOINT_BASE_URL = "/academic-semesters";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all academic semesters api endpoint
    academicSemesters: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicSemester[], meta: IMeta) => {
        return {
          academicSemesters: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.academicSemester],
    }),

    // GET single academic semester by id api endpoint
    academicSemester: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.academicSemester],
    }),

    // CREATE academic semester api endpoint
    addAcademicSemester: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.academicSemester],
    }),

    // UPDATE academic semester api endpoint
    updateAcademicSemester: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.academicSemester],
    }),

    // DELETE academic semester api endpoint
    deleteAcademicSemester: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.academicSemester],
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useAcademicSemestersQuery,
  useAcademicSemesterQuery,
  useUpdateAcademicSemesterMutation,
  useDeleteAcademicSemesterMutation,
} = academicSemesterApi;
