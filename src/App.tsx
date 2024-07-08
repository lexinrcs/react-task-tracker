import React, {useState, useEffect} from 'react';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import { AddTask } from './components/AddTask';

function App() {
  interface Task {
    id: number;
    text: string;
    day: string;
    reminder: boolean;
  }

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    
    return data;
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setAllTasks(tasksFromServer);
    };

    getTasks();
  }, [])

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const deleteTask = async (id:number) => {
    console.log('delete', id);
   try {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task with id ${id}`);
    }

    setAllTasks(allTasks.filter((task) => task.id !== id));
    console.log(`Task with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
  }
  }

  const toggleReminder = async (id:number) => {
    console.log('toggle', id);
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`, 
      {
        method: 'PUT', 
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify(updatedTask)
      });

      const data = await res.json();
    setAllTasks(allTasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task));
  }
  const addTask = async (task:Task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setAllTasks([...allTasks, data]);
    }

    const fetchTask = async (id:number) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
      
      return data;
    }

  return (
    <div className="container">
      <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask ? <AddTask onAdd={addTask} numOfTasks={allTasks.length}/>  : <></>}
      {allTasks.length > 0 ? <Tasks allTasks={allTasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        : <h3> No available tasks </h3>  
      }
    </div>
  );
}

export default App;
