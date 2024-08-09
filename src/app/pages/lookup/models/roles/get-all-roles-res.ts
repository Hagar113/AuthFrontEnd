export interface Roles {
    id: string;  // Change this to `number` if required
    name: string;
    code:string;
  }
  
  export interface RolesResponse {
    success: boolean;
    result: Roles[]; // Ensure this matches
    responseMessage?: string;
  }
  