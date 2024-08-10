export interface AssignedSubjectResponse {
    success: boolean;
    result: {
      id: number;
      name: string;
      academicYear: number;
    };
    responseMessage?: string;
  }
  