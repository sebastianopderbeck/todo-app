import React from "react";
import {Task, useTasks} from "./taskProvider.tsx";
import {NewTask} from "./newTask.tsx";
import {TaskDetail} from "./taskDetail.tsx";
import _ from "lodash";

export const TaskList = () => (
    <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">To Do Task Manager</h1>
        <div className="p-6 space-y-4 border border-gray-200 rounded-3xl">
            <NewTask />
            <TaskRows />
        </div>
    </div>
)

export const groupedTasks = (): Record<string, Task[]> => {
    const { tasks } = useTasks();
    return _.groupBy(tasks, "status");
};

export const TaskRows: React.FC = () => {
    const tasksByStatus = groupedTasks();

    return (
        <>
            {_.map(tasksByStatus, (tasks: Task[], status: string) => (
                <div key={status} className="space-y-2">
                    <h3 className={`text-sm font-semibold text-gray-700 uppercase ${statusColors[status] || "bg-gray-200"} px-3 py-1 rounded-md`}>
                        {status}
                    </h3>
                    {_.map(tasks, (task: Task) => (
                        <TaskDetail key={task.id} {...task} />
                    ))}
                </div>
            ))}
        </>
    );
};

const statusColors: Record<string, string> = {
    completed: "bg-green-300",
    pending: "bg-gray-300",
    'in-progress': "bg-orange-300",
};

export default TaskList;