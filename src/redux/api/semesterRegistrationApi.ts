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
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useSemesterRegistrationsQuery,
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,
} = semesterRegistrationApi;
