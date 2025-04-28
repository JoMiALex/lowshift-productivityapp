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
                const response = await fetch(`/api/checklist`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const toggleTask = async (index: number) => {
        const updatedTasks = [...tasks];
        const task = updatedTasks[index];
        task.completed = !task.completed;
        setTasks(updatedTasks);

        // Update the task in the database
        try {
            await fetch(`/api/checklist`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: task.id,
                    updates: { completed: task.completed },
                }),
            });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            {/* Button to navigate to Task Manager */}
            <button
                onClick={() => router.push('/Checklist/TaskManager')}
                className="absolute top-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            >
                Task Manager
            </button>

            <h2 className="text-xl font-bold mb-4">Daily Checklist</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(index)}
                            />
                            <span className={task.completed ? "line-through text-gray-500" : ""}>{task.text}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
