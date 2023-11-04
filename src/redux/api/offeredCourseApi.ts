// Imports

import { IMeta, IOfferedCourse } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/offered-courses";

export const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all offered courses api endpoint
    offeredCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
        return {
          offeredCourses: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.offeredCourse],
    }),

    // GET single offeredCourse by id api endpoint
    offeredCourse: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.offeredCourse],
    }),

    // CREATE offeredCourse api endpoint
    addOfferedCourse: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.offeredCourse],
    }),

    // UPDATE offeredCourse api endpoint
    updateOfferedCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.offeredCourse],
    }),

    // DELETE offeredCourse api endpoint
    deleteOfferedCourse: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.offeredCourse],
    }),
  }),
});

export const {
  useAddOfferedCourseMutation,
  useOfferedCoursesQuery,
  useOfferedCourseQuery,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
} = offeredCourseApi;
