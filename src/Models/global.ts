export interface ITask {
  title: string;
  description: string;
  assignedTo: string;
  taskCreatedAT: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Started' | 'In Progress';
  _id?: string;
  email?: string;
}
export interface ITaskSuccessResponse {
  success: boolean;
  response: ITask | ITask[];
  message?: string;
}
export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ApiAuthResponse {
  success: boolean;
  message?: string;
  response?: {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
  _token?: string;
  _expiresIn?: number;
}
