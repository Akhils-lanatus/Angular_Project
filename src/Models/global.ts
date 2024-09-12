export interface ITask {
  title: string;
  description: string;
  assignedTo: string;
  taskCreatedAT: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Started' | 'In Progress';
  _id?: string;
}
export interface ITaskSuccessResponse {
  success: boolean;
  response: ITask | ITask[];
  message?: string;
}
