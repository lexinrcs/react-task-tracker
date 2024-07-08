import React, {useState} from "react";
import { Task } from "./Task";

interface Task {
    id: number;
    text: string;
    day: string;
    reminder: boolean;
}

interface Props {
    allTasks: Task[];
    onDelete: (id:number) => void;
    onToggle: (id:number) => void;
}

export const Tasks:React.FC<Props> = ({allTasks, onDelete, onToggle}) => {
    return(
        <div>
            {allTasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </div>
    );
}