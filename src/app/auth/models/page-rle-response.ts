export interface PageRleResponse {
    success: boolean;
  result: {
    isValid: boolean;
    pages: PageRle[];
  };
  statusCode: number;
  requestId: string;
  error: any[];
  responseMessage: string | null;
}
export interface PageRle {
    pageId: number;
    pageName: string;
    pagePath: string;
  }