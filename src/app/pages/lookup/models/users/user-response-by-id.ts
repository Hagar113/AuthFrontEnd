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
    dateOfBirth: string; // أو Date إذا كنت تفضل استخدام نوع التاريخ
    roleCode: string; // تأكد من أن هذا يتطابق مع الـ roleId في النموذج
    roleId: number;
  }
  