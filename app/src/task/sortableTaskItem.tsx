import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskDetail } from "./taskDetail";
import { Task } from "../types/taskTypes";
import { DragIndicator } from "@mui/icons-material";

export const SortableTaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
    const [isEditing, setIsEditing] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log(isEditing)
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white rounded-lg shadow-sm transition grid ${isEditing ? "grid-cols-[1fr]" : "grid-cols-[40px_1fr]"} cursor-pointer`}
        >
            {!isEditing && <div
                {...listeners}
                {...attributes}
                className="cursor-grab hover:bg-gray-100 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <DragIndicator className="text-gray-500"/>
            </div>}

            <div className="flex-grow hover:bg-gray-100">
                <TaskDetail task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
        </div>
    );
};
