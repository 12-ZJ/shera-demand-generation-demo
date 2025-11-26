import { ApiError } from "../types";

export function handleApiError(error: unknown): ApiError {
  let status = 500;
  let message = "An unknown server error occurred.";
  let url = "";

  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object"
  ) {
    const err = error as {
      config?: { url?: string };
      response?: {
        status?: number;
        data?: any;
        config?: { url?: string };
      };
    };

    status = err.response?.status ?? 500;
    url = err.config?.url || err.response?.config?.url || "";

    const data = err.response?.data;

    if (typeof data === "string") {
      if (status === 503) {
        message = "503 Service Temporarily Unavailable";
      } else if (status === 502) {
        message = "502 Bad gateway";
      } else {
        message = data;
      }
    } else if (Array.isArray(data?.message)) {
      message = data.error.join(", ");
    } else {
      message = data?.error ?? data?.error_description ?? message;
    }
    
    if (status === 401 && url.includes("/auth/login")) {
      message = "Login failed. Please contact the administrator.";
    }
  }

  const e: ApiError = {
    err_code: status,
    err_msg: message
  };

  return e;
}