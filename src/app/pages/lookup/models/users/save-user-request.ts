export interface SaveUserRequest {
    id?: number; // Optional field, since it's nullable in C#
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password: string;
    academicYear: string;
    dateOfBirth: Date;
    roleId: number;
  }
  