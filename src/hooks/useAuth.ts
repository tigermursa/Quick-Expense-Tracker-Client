"use client";

import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState, useEffect } from "react";

// Define the shape of the expected error response
interface ErrorResponse {
  message?: string;
}

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Retrieve userId from local storage and set it
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      console.log(id);
    } else {
      setError("No user ID found in local storage");
    }
  }, []);

  // Use the RTK query to fetch user data, only if userId is available
  const {
    data: user,
    error: apiError,
    isLoading: loading,
    refetch,
  } = useGetUserQuery(userId!, {
    skip: !userId,
    pollingInterval: 0,
  });

  useEffect(() => {
    if (apiError) {
      // Handle different types of errors
      if ("data" in apiError) {
        // Cast apiError.data to the expected shape (ErrorResponse)
        const fetchError = apiError as FetchBaseQueryError;
        const errorData = fetchError.data as ErrorResponse;
        const errorMessage = errorData?.message || "Failed to fetch user";
        setError(errorMessage);
      } else {
        // Handle generic SerializedError or other errors
        console.log(apiError);
        setError("An unknown error occurred");
      }
    }
  }, [apiError]);

  return { user, loading, error, refetch };
};
