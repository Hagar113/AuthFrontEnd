
export interface AssignedPage {
    id: number;
    name: string;
    path: string;
  }
  
  export interface AssignedPagesResponse {
    statusCode: number;
    requestId: string;
    error: any[];
    result: AssignedPage[];
    success: boolean;
    responseMessage: string | null;
  }
  