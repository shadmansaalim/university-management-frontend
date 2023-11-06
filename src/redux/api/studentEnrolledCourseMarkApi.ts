// Imports
import { IMeta, IStudentEnrolledCourseMark } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "../tag-types";

export const ENDPOINT_BASE_URL = "/student-enrolled-course-marks";

const studentEnrollCourseMarkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myMarks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-marks`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (
        response: IStudentEnrolledCourseMark[],
        meta: IMeta
      ) => {
        return {
          myMarks: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),
    studentEnrolledCourseMarks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (
        response: IStudentEnrolledCourseMark[],
        meta: IMeta
      ) => {
        return {
          studentEnrolledCourseMarks: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),
    updateMarks: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/update-marks`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),
    evaluateFinalGpa: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/evaluate-final-gpa`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),
  }),
});

export const {
  useUpdateMarksMutation,
  useMyMarksQuery,
  useStudentEnrolledCourseMarksQuery,
  useEvaluateFinalGpaMutation,
} = studentEnrollCourseMarkApi;

export default studentEnrollCourseMarkApi;
