import { toastError } from "./toast-msg";

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message);
      return parsed.message ?? error.message;
    } catch {
      return error.message;
    }
  }
  return String(error);
};

export function errorValidation(res: unknown) {
  if (res && typeof res === "object" && "err_code" in res && "err_msg" in res) {
    const error = new Error(JSON.stringify({ code: res.err_code, message: res.err_msg }));
    error.name = "ApiError";
    throw error;
  }
}

export function handleApiErrorWithRedirect(
  error: unknown,
  router: { replace: (url: string) => void },
) {
  console.error("API Error:", error);
  if (error instanceof Error && error.name === "ApiError") {
    try {
      const { message, code } = JSON.parse(error.message);
      if (code === 401) {
        localStorage.clear();
        router.replace("/login");
      } else {
        toastError(message);
      }
    } catch {
      toastError("The message format is incorrect");
    }
  } else {
    let errorMessage: string;
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unidentified error occurred";
    }
    toastError(errorMessage);
  }
}