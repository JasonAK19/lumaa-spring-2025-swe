import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
}

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in again.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3005/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.post('http://localhost:3005/tasks', { title: newTask }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.put(`http://localhost:3005/tasks/${id}`, { title: editTaskTitle }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setEditTaskId(null);
      setEditTaskTitle('');
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`http://localhost:3005/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(task.id)}>Save</button>
                <button onClick={() => setEditTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => {
                  setEditTaskId(task.id);
                  setEditTaskTitle(task.title);
                }}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>
    </div>
  );
};

export default ViewTasks;