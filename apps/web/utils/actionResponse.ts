type Success<T> = {
  success: true;
  message?: string;
  data: T;
  error: null;
};

type Failure<E> = {
  success: false;
  message: string;
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T | Success<T> | Failure<E>>
): Promise<Result<T, E>> {
  try {
    const data = await promise;

    if (data && typeof data === "object") {
      if ("success" in data) {
        return data as unknown as Success<T>;
      }
    }

    return { success: true, message: "Success", data, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error", data: null, error: error as E };
  }
}

export const successResponse = <TData = null>(
  data: TData,
  message?: string
): Success<TData> => ({
  success: true,
  message,
  data,
  error: null,
});

export const errorResponse = (
  message: string,
  error?: Error | null
): Failure<Error> => ({
  success: false,
  message,
  data: null,
  error: error || new Error(message),
});
