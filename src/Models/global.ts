export interface ITask {
  title: string;
  description: string;
  assignedTo: string;
  createdAt: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Started' | 'In Progress';
}
