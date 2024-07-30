// src/app/models/role-response.model.ts

export interface Role {
    id: number;
    name: string;
    roleCode: string;
    
  }
  export interface RoleResponse {
    success: boolean; // Add this field to match your API response structure
    result: Role[];
    responseMessage?: string; // Optional field for error messages
  } 