// Imports

import { IMeta, ISemesterRegistration } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const ENDPOINT_BASE_URL = "/semester-registrations";

export const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all semester registrations api endpoint
    semesterRegistrations: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
        return {
          semesterRegistrations: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.semesterRegistration],
    }),

    // GET single semesterRegistration by id api endpoint
    semesterRegistration: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.semesterRegistration],
    }),

    // CREATE semesterRegistration api endpoint
    addSemesterRegistration: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.semesterRegistration],
    }),

    // UPDATE semesterRegistration api endpoint
    updateSemesterRegistration: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.semesterRegistration],
    }),

    // DELETE semesterRegistration api endpoint
    deleteSemesterRegistration: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.semesterRegistration],
    }),

    // Student
    myRegistration: build.query({
      query: () => ({
        url: `${ENDPOINT_BASE_URL}/my-registration`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.courseRegistration],
    }),
    startRegistration: build.mutation({
      query: () => ({
        url: `${ENDPOINT_BASE_URL}/start-registration`,
        method: "POST",
      }),
    }),
    mySemesterRegistrationCourses: build.query({
      query: () => ({
        url: `${ENDPOINT_BASE_URL}/my-semester-registration-courses
				`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.courseRegistration],
    }),
    enrollIntoCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/enroll-into-course`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.courseRegistration],
    }),
    withdrawFromCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/withdraw-from-course`,
        method: "POST",
        data,
      }),
      invalidatesTags: [TAG_TYPES.courseRegistration],
    }),
    confirmMyRegistration: build.mutation({
      query: () => ({
        url: `${ENDPOINT_BASE_URL}/confirm-registration`,
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.courseRegistration],
    }),

    // Admin
    startNewSemester: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}/start-new-semester`,
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.courseRegistration],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useSemesterRegistrationsQuery,
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,

  //Student
  useMyRegistrationQuery,
  useStartRegistrationMutation,
  useMySemesterRegistrationCoursesQuery,
  useEnrollIntoCourseMutation,
  useConfirmMyRegistrationMutation,
  useWithdrawFromCourseMutation,

  // Admin
  useStartNewSemesterMutation,
} = semesterRegistrationApi;
