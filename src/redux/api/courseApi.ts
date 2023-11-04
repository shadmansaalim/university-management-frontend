// Imports

import { ICourse, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all courses api endpoint
    courses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICourse[], meta: IMeta) => {
        return {
          courses: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.course],
    }),

    // GET single course by id api endpoint
    course: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.course],
    }),

    // CREATE course api endpoint
    addCourse: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.course],
    }),

    // UPDATE course api endpoint
    updateCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.course],
    }),

    // DELETE course api endpoint
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.course],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useCoursesQuery,
  useCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
