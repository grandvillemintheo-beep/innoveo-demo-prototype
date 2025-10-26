import { API_BASE_URL } from '../config';

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface ApiClientOptions extends Omit<RequestInit, 'body' | 'headers'> {
  json?: unknown;
  token?: string;
  body?: BodyInit | null;
  headers?: Record<string, string>;
}

export async function apiClient<TResponse>(path: string, options: ApiClientOptions = {}): Promise<TResponse> {
  const { json, token, headers, body, ...init } = options;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(headers ?? {})
  };

  let requestBody: BodyInit | null | undefined = body;

  if (json !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(json);
  }

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: requestBody
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson && payload?.message ? String(payload.message) : response.statusText;
    throw new ApiError(message || 'Request failed', response.status, payload);
  }

  return payload as TResponse;
}
