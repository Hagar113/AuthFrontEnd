export interface RoleResponse {
    success: boolean;
    result: Array<{ id: string, name: string }>; 
    responseMessage?: string;
  }
  