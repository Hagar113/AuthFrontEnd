

export interface RolesResponse {
    statusCode: number;
    requestId: string;
    error: any[];  
    result: Role[];
    success: boolean;
    responseMessage: string;
  }
  
  export interface Role {
    id: number;
    name: string;
    roleCode: string;
  }
  