// Imports
import { IMeta, IStudent } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "@/redux/tag-types";

const STUDENT_URL = "/students";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all students api endpoint
    students: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: STUDENT_URL,
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
        url: `${STUDENT_URL}/${id}`,
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
        url: `${STUDENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),

    // DELETE student api endpoint
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.student],
    }),
  }),
});

export const {
  useAddStudentWithFormDataMutation,
  useStudentsQuery,
  useStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
