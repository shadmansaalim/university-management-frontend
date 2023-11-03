// Imports
import { IFaculty, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const FACULTY_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all faculties api endpoint
    faculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FACULTY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.faculty],
    }),

    // GET single faculty by id api endpoint
    faculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FACULTY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.faculty],
    }),

    // CREATE faculty api endpoint
    addFacultyWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),

    // UPDATE faculty api endpoint
    updateFaculty: build.mutation({
      query: (data) => ({
        url: `${FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),

    // DELETE faculty api endpoint
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),
  }),
});

export const {
  useAddFacultyWithFormDataMutation,
  useFacultiesQuery,
  useFacultyQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = facultyApi;
