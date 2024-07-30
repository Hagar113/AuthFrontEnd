export interface Subject {
  id: number;
  name: string;
  academicYear: number; 
}

export interface SubjectResponse {
  success: boolean;
  result: Subject | Subject[]; 
  responseMessage?: string; 
}
