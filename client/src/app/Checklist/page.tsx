'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Checklist = () => {
    const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                const response = await fetch(`/Checklist/CheckAPI`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid content type, expected JSON');
                }
        
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const toggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return; // Ensure the task exists
        // Create a new task object with the updated completed status
        const updatedTask = { ...task, completed: !task.completed };

        // Update the task in the database
        try {
            await fetch(`/Checklist/CheckAPI`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: task.id,
                    updates: { completed: task.completed },
                }),
            });

            const updatedTasks = tasks.map((t) =>
                t.id === id ? updatedTask : t
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto flex flex-col justify-between h-full">
            <h2 className="p-5 text-3xl text-emerald-900 font-bold mb-4 self-center border-b-4 border-emerald-900">
            Tasks
            </h2>
            <div className="w-full">
            <ul>
                {tasks
                .filter((task) => !task.completed)
                .map((task) => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b border-emerald-900">
                    <div className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        />
                        <span className="text-black">{task.text}</span>
                    </div>
                    </li>
                ))}
            </ul>
            </div>

            {/* Button to navigate to Task Manager */}
            <button
            onClick={() => router.push('/Checklist/TaskManager')}
            className="mt-4 p-3 bg-emerald-900 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors self-center">Task Manager</button>
        </div>
    );
};

export default Checklist;
