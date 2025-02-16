'use client'
import React, { useState, useEffect } from 'react';

const Checklist = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() === '') return;
        setTasks([...tasks, { text: taskInput, completed: false }]);
        setTaskInput('');
    };

    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Daily Checklist</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a task..."
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(index)}
                            />
                            <span className={task.completed ? "line-through text-gray-500" : ""}>{task.text}</span>
                        </div>
                        <button onClick={() => removeTask(index)} className="text-red-500">X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
