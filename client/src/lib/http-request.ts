import { IHttpClient, HttpClientRequestConfig } from './http-client';

export class HttpRequest {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  get<T>(
    url: string,
    isAuth?: boolean,
    query?: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return this.httpClient.request<T>({
      url,
      method: 'GET',
      isAuth,
      query,
      headers,
    });
  }

  post<T>(
    url: string,
    data?: HttpClientRequestConfig['data'],
    isAuth?: boolean,
    query?: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return this.httpClient.request<T>({
      url,
      method: 'POST',
      data,
      isAuth,
      query,
      headers,
    });
  }

  patch<T>(
    url: string,
    data: HttpClientRequestConfig['data'],
    isAuth?: boolean
  ) {
    return this.httpClient.request<T>({ url, method: 'PATCH', data, isAuth });
  }

  delete<T>(url: string, isAuth?: boolean) {
    return this.httpClient.request<T>({ url, method: 'DELETE', isAuth });
  }
}

export default HttpRequest;
