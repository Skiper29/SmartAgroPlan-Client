import { toast } from 'react-toastify';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const defaultBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'https://localhost:5001/api';

const responseData = <T>(response: AxiosResponse<T>) => response.data;

const createAxiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    async (response) => response,
    async ({ response, message }: AxiosError) => {
      let errorMessage = '';
      if (message === 'Network Error') {
        errorMessage = message;
      }

      switch (response?.status) {
        case StatusCodes.INTERNAL_SERVER_ERROR:
          errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
          break;
        case StatusCodes.NOT_FOUND:
          errorMessage = ReasonPhrases.NOT_FOUND;
          break;
        case StatusCodes.BAD_REQUEST:
          errorMessage = ReasonPhrases.BAD_REQUEST;
          break;
        case StatusCodes.FORBIDDEN:
          errorMessage = ReasonPhrases.FORBIDDEN;
          break;
        default:
          break;
      }
      if (errorMessage !== '' && import.meta.env.MODE === 'development') {
        toast.error(errorMessage);
      }

      return Promise.reject(response);
    },
  );

  return {
    get: async <T>(url: string, params?: URLSearchParams) =>
      instance.get<T>(url, { params }).then(responseData),

    post: async <T>(url: string, body: object, headers?: object) =>
      instance.post<T>(url, body, headers).then(responseData),

    put: async <T>(url: string, body: object) =>
      instance.put<T>(url, body).then(responseData),

    delete: async <T>(url: string) =>
      instance.delete<T>(url).then(responseData),
  };
};

const Agent = createAxiosInstance(defaultBaseUrl);

export default Agent;
