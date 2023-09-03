import {Task} from "task";

class ApiClient {
  async getTasks(): Promise<Array<Task>> {
    const response = await fetch(`${process.env.API_URL}/tasks`);
    if (!response.ok) throw new Error("get tasks failed");
    const tasks = (await response.json()) as Array<Task>;
    return tasks;
  }

  async createTask(title: string): Promise<void> {
    const response = await fetch(`${process.env.API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title}),
    });
    if (!response.ok) throw new Error("create task failed");
  }

  async doneTask(taskId: number): Promise<void> {
    const response = await fetch(
      `${process.env.API_URL}/tasks/${taskId}/done`,
      {
        method: "POST",
      }
    );
    if (!response.ok) throw new Error("done task failed");
  }

  async clearDoneTasks(): Promise<void> {
    const response = await fetch(`${process.env.API_URL}/tasks/clear`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("clear done tasks failed");
  }
}

export const client = new ApiClient();
