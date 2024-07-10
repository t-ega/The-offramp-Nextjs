import axios, { AxiosInstance } from "axios";
import { ENDPOINTS } from "./endpoints";

class ApiRequest {
  private readonly httpClient: AxiosInstance;
  private _instance: ApiRequest;

  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });
    this._instance = this;

    this.httpClient.interceptors.request.use(
      (config) => {
        // Get the token from cookies
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        // If the token exists, add it to the Authorization header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        if (
          response.config.url?.includes(ENDPOINTS.SIGN_UP) ||
          response.config.url?.includes(ENDPOINTS.SIGN_IN)
        ) {
          const { data } = response;

          const token = data.data.token;
          const username = data.data.username;

          // Store the token in cookies
          document.cookie = `token=${token};path=/;`;
          document.cookie = `username=${username};path=/;`;
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public getInstance() {
    if (!this._instance) {
      this._instance = new ApiRequest();
      return this._instance;
    }
    return this._instance;
  }

  async post(url: string, data: any) {
    return await this.httpClient.post(url, data);
  }

  async get(url: string) {
    return await this.httpClient.get(url);
  }

  formatApiErrorMessage(e: any) {
    const response = e.response;
    const data = e.response?.data;
    if (response && data) {
      const msg = data.errors.length ? data.errors : data.message;
      return msg;
    }

    return e.message;
  }
}

export default new ApiRequest().getInstance();
