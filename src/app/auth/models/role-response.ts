export interface RoleResponse {
    success: boolean;
    result: Array<{ id: string, name: string ,code:string}>; 
    responseMessage?: string;
  }
  