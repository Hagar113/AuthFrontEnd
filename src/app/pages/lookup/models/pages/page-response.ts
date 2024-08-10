

export interface Page {
  pageId: number;
  pageName: string;
  pagePath: string;
}

export interface PagesResponse {
  statusCode: number;
  requestId: string;
  error: any[];
  result: Page[];
  success: boolean;
  responseMessage: string | null;
}
