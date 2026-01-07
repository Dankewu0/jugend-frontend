type ApiError = {
  message?: string;
  errors?: unknown;
  status?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;
  const start = performance.now();

  console.groupCollapsed(
    `%cAPI → ${options.method ?? "GET"} ${path}`,
    "color:#4ade80;font-weight:bold",
  );

  console.log("Request", {
    url,
    options,
  });

  try {
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const duration = Math.round(performance.now() - start);

    let body: any = null;
    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      body = await res.json();
    }

    if (!res.ok) {
      console.error("❌ Response error", {
        status: res.status,
        body,
        duration: `${duration}ms`,
      });

      const error: ApiError = {
        status: res.status,
        message: body?.message ?? "Request failed",
        errors: body?.errors,
      };

      throw error;
    }

    console.log("✅ Response OK", {
      status: res.status,
      body,
      duration: `${duration}ms`,
    });

    return body as T;
  } catch (e) {
    console.error("Fetch crashed", e);
    throw e;
  } finally {
    console.groupEnd();
  }
}
