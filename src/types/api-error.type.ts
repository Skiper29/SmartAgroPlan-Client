// API Error Type Definition
// This type represents the structure of errors returned from the API

export interface ApiErrorMessage {
  message: string;
}

export interface ApiError {
  data?: ApiErrorMessage[] | ApiErrorMessage | string;
  status?: number;
  statusText?: string;
}

/**
 * Extracts a user-friendly error message from various error structures
 * @param error - The error object which can be of various types
 * @returns A formatted error message string
 */
export function extractErrorMessage(error: unknown): string {
  // Default error message
  let errorMessage = 'Сталася невідома помилка';

  // Check if error has response data (Axios error structure)
  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error as ApiError;
    const errorData = apiError.data;

    // Check if it's an array of error objects with message property
    if (Array.isArray(errorData) && errorData.length > 0) {
      const messages = errorData.map((e: any) => e?.message).filter(Boolean);
      if (messages.length > 0) {
        errorMessage = messages.join('; ');
      }
    }
    // Check if it's a single error object with message
    else if (
      errorData &&
      typeof errorData === 'object' &&
      'message' in errorData
    ) {
      errorMessage = (errorData as ApiErrorMessage).message;
    }
    // Check if it's a string
    else if (typeof errorData === 'string') {
      errorMessage = errorData;
    }
  }
  // Fallback to standard Error.message
  else if (error instanceof Error && error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
}
