import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {TaskList} from "./task/taskList.tsx";
import {TaskProvider} from "./task/taskProvider.tsx";

export default function App() {
    return (
        <Router>
            <TaskProvider>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                </Routes>
            </TaskProvider>
        </Router>
    );
}