

export interface Page {
    id: number;
    name: string;
    
    
  }
  export interface PagesResponse {
    success: boolean; 
    result:Page| Page[];
    responseMessage?: string; 
  } 