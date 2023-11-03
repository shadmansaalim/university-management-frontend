// Imports
import { IFaculty, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "../tag-types";

const FACULTY_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFacultyWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),

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
  }),
});

export const { useFacultiesQuery, useAddFacultyWithFormDataMutation } =
  facultyApi;
