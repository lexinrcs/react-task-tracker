import React from "react";
import {FaTimes} from 'react-icons/fa';

interface Props {
    task:{
        id: number;
        text: string;
        day: string;
        reminder: boolean;
    };
    onDelete: (id:number) => void;
    onToggle: (id:number) => void;
}

export const Task:React.FC<Props> = ({task, onDelete, onToggle}) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        switch (e.detail) {
          case 1:
            break;
          case 2:
            onToggle(task.id);
            break;
          default:
            break;
        }
      };
      
    return(
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onClick={handleClick}>
            <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    );
};

// reference: https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component