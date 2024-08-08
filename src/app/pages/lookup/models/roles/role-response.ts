
export interface Role {
    id: number;
    name: string;
    roleCode: string;
    SelectedPageIds: number[];
  }
  export interface RoleResponse {
    success: boolean; 
    result:Role| Role[];
    responseMessage?: string; 
  } 