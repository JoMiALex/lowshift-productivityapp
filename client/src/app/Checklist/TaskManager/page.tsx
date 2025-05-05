'use client';

import React, { useState, useEffect } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
    const [taskInput, setTaskInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                const response = await fetch(`/api/Checklist/CheckAPI`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        if (taskInput.trim() === '') {
            setError('Task description cannot be empty.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`/api/Checklist/CheckAPI`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task: { text: taskInput, completed: false },
                }),
            });
            const data = await response.json();
            setTasks([...tasks, { id: data.id, text: taskInput, completed: false }]);
            setTaskInput('');
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async (id: string) => {
        try {
            await fetch(`/api/Checklist/CheckAPI`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-xl text-black font-bold mb-4">Task Manager</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a task..."
                    className="flex-1 p-2 text-black border rounded"
                />
                <button onClick={addTask} disabled={loading} className="p-2 bg-blue-500 text-white rounded">
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <span>{task.text}</span>
                        <button onClick={() => removeTask(task.id)} className="text-red-500">X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;