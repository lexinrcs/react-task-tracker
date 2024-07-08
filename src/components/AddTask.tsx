import React, {useState} from "react";

interface Task {
    id: number;
    text: string;
    day: string;
    reminder: boolean;
}

interface Props {
    onAdd:(task:Task)=>void;
    numOfTasks:number;
}

export const AddTask:React.FC<Props> = ({onAdd, numOfTasks}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!text) {
            alert('Please add a task');
            return;
        } else if(!day) {
            alert('Please add a date and time');
            return;
        } 

        onAdd({id: numOfTasks+1, text: text, day: day, reminder:reminder});

        setText('');
        setDay('');
        setReminder(false);
    }
    
    return (
        <form action="" className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Day and Time</label>
                <input type="text" placeholder="Add Date and Time" value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    )
};
