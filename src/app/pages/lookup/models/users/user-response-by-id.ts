export interface UsersResponseWrapper {
    statusCode: number;
    requestId: string;
    error: any[];
    result: Users;
    success: boolean;
    responseMessage: string;
  }
  
  export interface Users {
    id: number;
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password: string;
    academicYear: string;
    dateOfBirth: string; 
    roleCode: string; 
    roleId: number;
  }
  