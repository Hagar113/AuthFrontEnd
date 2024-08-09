export interface UserResponse {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    schoolYear: string;
    dateOfBirth: Date;
    roleId?: number; // Optional property
}

export interface UserResponseWrapper {
    success: boolean;
    result: UserResponse[];
    error?: string; // Optional field for error message
}
