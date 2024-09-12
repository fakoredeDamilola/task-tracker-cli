import fs from "fs";
import path from "path";
import { ITask } from "./ITask";
import { Status } from "./enum";

const filePath = path.join(__dirname, "/tasks.json");

function addToJsonFile(task: string,description?:string) {
  const newTask: ITask = {
    id: 1,
    name: task,
    status: Status["in-progress"],
    description:description ?? "",
    createdAt: new Date().toISOString(),
    updatedAt:new Date().toISOString(),
  };

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);

    const getLastID = tasks[tasks.length - 1].id;
    const newID = getLastID + 1;

    tasks.push({ ...newTask, id: newID });

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
    console.log("File updated successfully!");
  } else {
    const tasks = [{ ...newTask, id: 1 }];

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
    console.log("File created successfully!");
  }
}

function updateTaskInJSONFile(taskId: number, description: string) {
  if (!fs.existsSync(filePath)) {
    return "No task found";
  } else {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);
    const taskIndex = checkForTask(taskId, tasks);
    if (taskIndex === "not found") {
      console.log("task with ID not found");
      return;
    } else {
      const task: ITask = tasks.splice(taskIndex, 1)[0];
      task.description = description;
      task.updatedAt = new Date().toISOString();
      tasks.push(task);
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
      console.log("task updated");
    }
  }
}

function deleteTaskINJSONFile(taskId: number) {
  if (!fs.existsSync(filePath)) {
    return "No task found";
  } else {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);
    const taskIndex = checkForTask(taskId, tasks);
    if (taskIndex === "not found") {
      console.log("task with ID not found");
      return;
    } else {
      tasks.splice(taskIndex, 1);

      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
      console.log("task deleted");
    }
  }
}

function updateTaskStatus(taskId: number, status: string) {
  if (!fs.existsSync(filePath)) {
    return "No task found";
  } else {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);
    const taskIndex = checkForTask(taskId, tasks);
    if (taskIndex === "not found") {
      console.log("task with ID not found");
      return;
    } else {
      const statusValue = status.slice(5);
      const task: ITask = tasks.splice(taskIndex, 1)[0];
      task.status = Status[statusValue as keyof typeof Status];
      task.updatedAt = new Date().toISOString()
      tasks.push(task);
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
      console.log("updated task status successfully");
    }
  }
}

function listTaskByStatus(status: Status) {
  if (!fs.existsSync(filePath)) {
    return "No task found";
  } else {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);
    const taskByStatus = tasks.filter((task: ITask) => task.status === status);
    console.log(taskByStatus);
  }
}

function checkForTask(taskId: number, tasks: ITask[]) {
  const taskIndex = tasks.findIndex((task: ITask) => task.id === taskId);
  if (taskIndex === -1) {
    return "not found";
  } else {
    return taskIndex;
  }
}

export {
  addToJsonFile,
  updateTaskInJSONFile,
  deleteTaskINJSONFile,
  updateTaskStatus,
  listTaskByStatus,
};
