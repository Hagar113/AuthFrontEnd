export interface UserResponse {
    id: number;
    userName: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
    password:string;
    AcadymicYear: string;
    dateOfBirth: Date;
    roleId?: number; // Optional property
}

export interface UserResponseWrapper {
    success: boolean;
    result: UserResponse[];
    error?: string; // Optional field for error message
}
