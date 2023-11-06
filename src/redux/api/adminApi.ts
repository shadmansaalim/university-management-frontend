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

    admin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.admin],
    }),
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [TAG_TYPES.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.admin],
    }),
  }),
});

export const {
  useAdminsQuery,
  useAddAdminWithFormDataMutation,
  useAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
