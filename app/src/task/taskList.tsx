import {useTasks} from "./taskProvider.tsx";
import {NewTask} from "./newTask.tsx";
import {TaskDetail} from "./taskDetail.tsx";

export const TaskList = () => {
    const { tasks } = useTasks();
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">To Do Task Manager</h1>
            <div className="p-6 space-y-4 border border-gray-200 rounded-3xl">
                <NewTask />

                <div className="hover:shadow-md flex justify-between flex-col bg-white">
                    { tasks.map(TaskDetail) }
                </div>
            </div>
        </div>
    )
}

export default TaskList;