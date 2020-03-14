import Task, { TaskProps } from "root/models/task";

export class TaskTransformer {
  static transform (tasks: TaskProps[]): Record<string, any> {
    const data = tasks.map((task) => {
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        completedAt: task.completedAt,
        dueAt: task.dueAt,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        user: task.user,
      };
    });

    return {
      meta: {
        count: tasks.length,
      },
      data
    };
  }

  static transformSingle (task: TaskProps): Record<string, any> {
    return {
      data: {
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        completedAt: task.completedAt,
        dueAt: task.dueAt,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        user: task.user,
      }
    };
  }
}
