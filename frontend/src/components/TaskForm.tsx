import React, { useState } from 'react';
import axios from 'axios';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3005/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Task created');
    } catch (error) {
      alert('Task creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;