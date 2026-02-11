// API Service for all backend calls
import axios from "axios";
import type { AxiosInstance } from "axios";
import { API_BASE_URL, TOKEN_KEY } from "../config";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  Group,
  Lecture,
} from "../types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add token to authenticated requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 errors - clear token and redirect
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints - these don't require prior authentication
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/user/login`,
      credentials
    );
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/user/register`,
      data
    );
    return response.data;
  }

  async getUserInfo(): Promise<User> {
    const response = await this.api.get<User>("/user");
    return response.data;
  }

  async updateUserGroup(groupId: number): Promise<void> {
    await this.api.put("/user/group", { groupId });
  }

  // Group endpoints (no auth required)
  async getGroups(): Promise<Group[]> {
    const response = await axios.get<{ groups: Group[] }>(
      `${API_BASE_URL}/group`
    );
    return response.data.groups;
  }

  async getGroup(id: number): Promise<Group> {
    const response = await axios.get<{ group: Group }>(
      `${API_BASE_URL}/group/${id}`
    );
    return response.data.group;
  }

  // Lecture endpoints
  async getLecturesByDate(date: string): Promise<Lecture[]> {
    const response = await this.api.get<{ lectures: Lecture[] }>(
      `/lecture/${date}`
    );
    return response.data.lectures;
  }

  async getLecturesByGroupAndDate(
    groupId: number,
    date: string
  ): Promise<Lecture[]> {
    const response = await this.api.get<{ lectures: Lecture[] }>(
      `/lecture/${groupId}/${date}`
    );
    return response.data.lectures;
  }

  async getLecturesByDateRange(
    dateFrom: string,
    dateTo: string
  ): Promise<Lecture[]> {
    const response = await this.api.get<{ lectures: Lecture[] }>(
      `/lecture/range/${dateFrom}/${dateTo}`
    );
    return response.data.lectures;
  }

  async getLecturesByGroupAndDateRange(
    groupId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<Lecture[]> {
    const response = await this.api.get<{ lectures: Lecture[] }>(
      `/lecture/${groupId}/range/${dateFrom}/${dateTo}`
    );
    return response.data.lectures;
  }

  async getLectureExchanges(date: string): Promise<string[]> {
    const response = await this.api.get<{ lectures: string[] }>(
      `/lecture/exchanges/${date}`
    );
    return response.data.lectures;
  }
}

export const apiService = new ApiService();
