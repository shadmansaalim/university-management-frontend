// Imports

import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";
import { IOfferedCourseSection } from "../../types/common";

const ENDPOINT_BASE_URL = "/offered-course-sections";

export const offeredCourseSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all offered course sections api endpoint
    offeredCourseSections: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IOfferedCourseSection[], meta: IMeta) => {
        return {
          offeredCourseSections: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.offeredCourseSection],
    }),

    // GET single offeredCourseSection by id api endpoint
    offeredCourseSection: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.offeredCourseSection],
    }),

    // CREATE offeredCourseSection api endpoint
    addOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.offeredCourseSection],
    }),

    // UPDATE offeredCourseSection api endpoint
    updateOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.offeredCourseSection],
    }),

    // DELETE offeredCourseSection api endpoint
    deleteOfferedCourseSection: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.offeredCourseSection],
    }),
  }),
});

export const {
  useAddOfferedCourseSectionMutation,
  useOfferedCourseSectionsQuery,
  useOfferedCourseSectionQuery,
  useUpdateOfferedCourseSectionMutation,
  useDeleteOfferedCourseSectionMutation,
} = offeredCourseSectionApi;
