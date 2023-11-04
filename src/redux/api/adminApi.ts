// Imports
import { IAdmin, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TAG_TYPES } from "../tag-types";

const ENDPOINT_BASE_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TAG_TYPES.admin],
    }),

    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [TAG_TYPES.admin],
    }),
  }),
});

export const { useAdminsQuery, useAddAdminWithFormDataMutation } = adminApi;
