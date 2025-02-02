import React from "react";
import { NewTask } from "./newTask.tsx";
import { TaskDetail } from "./taskDetail.tsx";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import _ from "lodash";
import {useTasks} from "../context/taskProvider";
import {Task} from "../types/taskTypes";

interface TaskColumnProps {
    status: string;
    tasks: Task[];
}

const STATUSES = ["pending", "in-progress", "completed"];

export const TaskList = () => (
    <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">To Do Task Manager</h1>
        <div className="p-6 space-y-4 border border-gray-200 rounded-3xl">
            <NewTask />
            <DndProvider backend={HTML5Backend}>
                <TaskRows />
            </DndProvider>
        </div>
    </div>
);

const groupedTasks = (): Record<string, Task[]> => {
    const { tasks } = useTasks();
    return _.groupBy(tasks, "status");
};

export const TaskRows: React.FC = () => {
    const tasksByStatus = groupedTasks();

    return (
        <div className="grid grid-cols-3 gap-4">
            {STATUSES.map((status) => (
                <TaskColumn key={status} status={status} tasks={tasksByStatus[status] || []} />
            ))}
        </div>
    );
};

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks }) => {
    const { modifyTask } = useTasks();

    const [, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (draggedTask: Task) => {
            if (draggedTask.status !== status) {
                modifyTask({ ...draggedTask, status });
            }
        },
    }));

    return (
        <div key={status} ref={drop} className="flex flex-col gap-2 p-3 border border-gray-300 rounded-lg min-h-[150px]">
            <h3 className={`text-sm font-semibold text-gray-700 uppercase ${statusColors[status]} px-3 py-1 rounded-md`}>
                {status}
            </h3>
            {tasks.length > 0 ? (
                tasks.map((task: Task) => <TaskDetail key={task._id} {...task} />)
            ) : (
                <div className="text-gray-400 text-sm italic text-center p-4">
                    Drop Here
                </div>
            )}
        </div>
    );
};


export const statusColors: Record<string, string> = {
    completed: "bg-green-300",
    pending: "bg-gray-300",
    "in-progress": "bg-orange-300",
};

export default TaskList;
