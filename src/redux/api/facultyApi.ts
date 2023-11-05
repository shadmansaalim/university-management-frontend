// Imports
import { ICoreFaculty, IFaculty, IFacultyCourse, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all faculties api endpoint
    faculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
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
        url: `${ENDPOINT_BASE_URL}/${id}`,
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
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),

    // DELETE faculty api endpoint
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.faculty],
    }),

    facultyCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-courses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFacultyCourse[], meta: IMeta) => {
        return {
          myCourses: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),

    facultyCourseStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-course-students`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICoreFaculty[], meta: IMeta) => {
        return {
          myCourseStudents: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.student],
    }),
  }),
});

export const {
  useAddFacultyWithFormDataMutation,
  useFacultiesQuery,
  useFacultyQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,

  useFacultyCoursesQuery,
  useFacultyCourseStudentsQuery,
} = facultyApi;
