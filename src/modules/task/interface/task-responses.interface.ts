export interface TaskResponse {
    message: string;
    task: {
      id: string;
      title: string;
      description: string;
      status: string;
    };
  }
  