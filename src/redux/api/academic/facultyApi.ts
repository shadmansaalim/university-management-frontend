// Imports

import { IAcademicFaculty, IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/academic-faculties";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all academic faculties api endpoint
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.academicFaculty],
    }),

    // GET single academic faculty by id api endpoint
    academicFaculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.academicFaculty],
    }),

    // CREATE academic faculty api endpoint
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.academicFaculty],
    }),

    // UPDATE academic faculty api endpoint
    updateAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.academicFaculty],
    }),

    // DELETE academic faculty api endpoint
    deleteAcademicFaculty: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.academicFaculty],
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useAcademicFacultiesQuery,
  useAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
} = academicFacultyApi;
