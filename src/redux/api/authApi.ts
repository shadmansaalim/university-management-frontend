// Imports
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${ENDPOINT_BASE_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [TAG_TYPES.user],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
