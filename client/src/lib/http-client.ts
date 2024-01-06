import { Errors } from '@/enums/error';
import { RootStore } from '@/stores/root.store';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ErrorHandler } from './error-handler';

export type HttpClientRequestConfig = {
  url: string;
  method: string;
  data?: any;
  isAuth?: boolean;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export interface IHttpClient {
  baseUrl: string;
  request<T>(config: HttpClientRequestConfig): Promise<T | null>;
}

type HttpRequestError = AxiosError<{
  message?: string;
  errors?: { msg: string }[];
}>;

type CustomHttpClientArgs = {
  baseUrl: string;
  rootStore: RootStore;
};

class CustomHttpClient implements IHttpClient {
  private axios: AxiosInstance = axios.create();
  private errorHandler: ErrorHandler = new ErrorHandler();
  private rootStore: RootStore;

  baseUrl: string;

  constructor({ baseUrl, rootStore }: CustomHttpClientArgs) {
    this.baseUrl = baseUrl;
    this.rootStore = rootStore;

    this.registerInterceptors();
  }

  private registerInterceptors() {
    this.axios.interceptors.response.use(
      (response) => response,
      this.handleUnauthorized.bind(this)
    );
  }

  private async handleUnauthorized(axiosError: AxiosError) {
    if (axiosError?.response?.status === 401) {
      return this.rootStore.authStore.signOut();
    } else {
      return Promise.reject(axiosError);
    }
  }

  private getAuthHeader(accessToken?: string) {
    const { auth } = this.rootStore.authStore;
    const tokenType = 'Bearer';
    return {
      Authorization: `${tokenType} ${accessToken ?? auth?.accessToken}`,
    };
  }

  private buildUrl(path: string, query?: Record<string, unknown>) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    }

    const stringifiedParams = searchParams.toString();

    if (stringifiedParams) {
      return `${path}?${stringifiedParams}`;
    }

    return path;
  }

  private handleRequestError(httpRequestError: HttpRequestError) {
    const { message, errors } = httpRequestError?.response?.data ?? {};
    const messages = [];

    if (message) {
      messages.push(message);
    } else if (errors) {
      for (const error of errors) {
        messages.push(error.msg);
      }
    } else {
      messages.push(Errors.DefaultRequestError);
    }

    for (const message of messages) {
      this.errorHandler.handle(message, 'error');
    }
  }

  async request<T>({
    url,
    method,
    data,
    isAuth = true,
    query,
    headers,
  }: HttpClientRequestConfig) {
    const builtUrl = this.buildUrl(this.baseUrl + url, query);

    let requestConfig: AxiosRequestConfig = {
      url: builtUrl,
      method,
    };

    if (data) {
      requestConfig = { ...requestConfig, data };
    }

    if (isAuth) {
      requestConfig = {
        ...requestConfig,
        headers: { ...this.getAuthHeader(), ...headers },
      };
    }

    try {
      const res = await this.axios.request<T>(requestConfig);
      return res?.data;
    } catch (err) {
      this.handleRequestError(err as HttpRequestError);
    }

    return null;
  }
}

export default CustomHttpClient;
