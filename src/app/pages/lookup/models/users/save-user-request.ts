export interface SaveUserRequest {
    userId?: number; 
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password: string;
    academicYear: string;
    dateOfBirth: Date;
    role: number; 
}
