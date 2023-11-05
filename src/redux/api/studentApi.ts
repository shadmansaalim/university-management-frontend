// Imports
import { IMeta, IMyCourse, IStudent } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/students";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all students api endpoint
    students: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IStudent[], meta: IMeta) => {
        return {
          students: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),

    // GET single student by id api endpoint
    student: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.student],
    }),

    // CREATE student api endpoint
    addStudentWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),

    // UPDATE student api endpoint
    updateStudent: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),

    // DELETE student api endpoint
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),
    myCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-courses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IMyCourse[], meta: IMeta) => {
        return {
          myCourses: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),
    myCourseSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-course-schedules`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IStudent[], meta: IMeta) => {
        return {
          myCourseSchedules: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),
    myAcademicInfos: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ENDPOINT_BASE_URL}/my-academic-infos`,
        method: "GET",
        params: arg,
      }),
      providesTags: [TAG_TYPES.student],
    }),
  }),
});

export const {
  useAddStudentWithFormDataMutation,
  useStudentsQuery,
  useStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useMyCoursesQuery,
  useMyCourseSchedulesQuery,
  useMyAcademicInfosQuery,
} = studentApi;
