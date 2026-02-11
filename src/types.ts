// Type definitions for the application

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  group: {
    id: number;
    name: string;
  };
}

export interface Group {
  ID: number;
  Name: string;
  External_ID: string;
}

export interface Subject {
  ID: number;
  Name: string;
  External_ID: string;
}

export interface Lecturer {
  ID: number;
  Name: string;
  External_ID: string;
}

export interface Room {
  ID: number;
  RoomNumber: string;
  External_ID: string;
}

export interface Color {
  ID: number;
  Hex: string;
}

export interface Lecture {
  ID: number;
  Date: string;
  Period: string;
  StartTime: string;
  EndTime: string;
  Subject: Subject;
  Lecturers: Lecturer[];
  Rooms: Room[];
  Groups: Group[];
  Colors: Color[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  groupId: number;
}

export interface AuthResponse {
  token: string;
}

export type ViewType = "day" | "week" | "month";
