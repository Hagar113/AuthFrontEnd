export interface UserResponse {
    id: number;
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password: string | null; 
    academicYear: string; 
    dateOfBirth: Date;
    roleId: string;

  }
  
  export interface UserResponseWrapper {
    success: boolean;
    result: UserResponse; 
    error?: string; 
  }
  