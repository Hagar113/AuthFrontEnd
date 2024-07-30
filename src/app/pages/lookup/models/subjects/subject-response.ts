export interface Subject {
  id: number;
  name: string;
  academicYear: number; // Adjusted to number as per your payload
}

export interface SubjectResponse {
  success: boolean;
  result: Subject | Subject[]; // Can be a single subject or an array
  responseMessage?: string; // Optional field for error messages
}
