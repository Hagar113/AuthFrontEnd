export interface Roles {
    id: string;  
    name: string;
    code:string;
  }
  
  export interface RolesResponse {
    success: boolean;
    result: Roles[]; 
    responseMessage?: string;
  }
  