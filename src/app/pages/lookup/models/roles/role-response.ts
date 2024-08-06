
export interface Role {
    id: number;
    name: string;
    roleCode: string;
    dropdown: string[];
  }
  export interface RoleResponse {
    success: boolean; 
    result:Role| Role[];
    responseMessage?: string; 
  } 