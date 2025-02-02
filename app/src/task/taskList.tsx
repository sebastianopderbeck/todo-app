import React, { useEffect, useState } from "react";
import { NewTask } from "./newTask";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useTasks } from "../context/taskProvider";
import { Task } from "../types/taskTypes";
import { SortableTaskItem } from "./sortableTaskItem";
import _ from "lodash";

export const STATUSES = ["pending", "in-progress", "completed"];

export const TaskList = () => (
    <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">To Do Task Manager</h1>
        <div className="p-6 space-y-4 border border-gray-200 rounded-3xl">
            <NewTask />
            <TaskRows />
        </div>
    </div>
);

export const TaskRows: React.FC = () => {
    const { tasks, modifyTask } = useTasks();
    const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>({});

    useEffect(() => {
        setGroupedTasks(_.groupBy(tasks, "status"));
    }, [tasks]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeTask = tasks.find((t: Task) => t._id === active.id);
        const overTask = tasks.find((t: Task) => t._id === over.id);

        if (!activeTask || !overTask) return;

        if (activeTask.status !== overTask.status) {
            modifyTask({ ...activeTask, status: overTask.status });
        } else {
            const updatedTasks = arrayMove(
                groupedTasks[activeTask.status] || [],
                groupedTasks[activeTask.status].findIndex((t) => t._id === active.id),
                groupedTasks[activeTask.status].findIndex((t) => t._id === over.id)
            );

            setGroupedTasks((prev) => ({
                ...prev,
                [activeTask.status]: updatedTasks,
            }));
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-3 gap-4">
                {STATUSES.map((status) => (
                    <TaskColumn key={status} status={status} tasks={groupedTasks[status] || []} />
                ))}
            </div>
        </DndContext>
    );
};

const TaskColumn: React.FC<{ status: string; tasks: Task[] }> = ({ status, tasks }) => (
    <div key={status} className="flex flex-col gap-2 p-3 border border-gray-300 rounded-lg min-h-[150px]">
        <h3 className={`text-sm font-semibold text-gray-700 uppercase ${statusColors[status]} px-3 py-1 rounded-md`}>
            {status}
        </h3>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <SortableTaskItem key={task._id} task={task} />
            ))}
        </SortableContext>
    </div>
);

export const statusColors: Record<string, string> = {
    completed: "bg-green-300",
    pending: "bg-gray-300",
    "in-progress": "bg-orange-300",
};

export default TaskList;
