// src/app/pages/lookup/models/pages/page-response.ts

export interface Page {
    pageId: number;
    pageName: string;
    pagePath:string;
    // Add any other properties needed
  }
  
  export interface PagesResult {
    isValid: boolean;
    pages: Page[];
  }
  
  export interface PagesResponse {
    statusCode: number;
    requestId: string;
    error: any[];
    result: PagesResult;
    success: boolean;
    responseMessage: string | null;
  }
  
  