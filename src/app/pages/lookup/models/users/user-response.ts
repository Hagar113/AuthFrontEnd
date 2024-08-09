export interface UserResponse {
    id: number;
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password: string | null; // تعديل لتناسب قيمة null
    academicYear: string; // تعديل الاسم من AcadymicYear إلى academicYear
    dateOfBirth: Date;
    roleCode: string; // Optional property
  }
  
  export interface UserResponseWrapper {
    success: boolean;
    result: UserResponse; // تعديل لتناسب كائن واحد بدلاً من مصفوفة
    error?: string; // Optional field for error message
  }
  