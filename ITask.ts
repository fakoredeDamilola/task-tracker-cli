import { Status } from "./enum";

export interface ITask {
  name: string; 
  id: number;
  status: Status;
  createdAt:string;
  updatedAt:string;
  description:string;
}
