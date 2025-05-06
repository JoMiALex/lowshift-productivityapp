'use client';

import { useEffect, useState } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean; taskStart: string; taskEnd: string }[]>([]);
    const [taskInput, setTaskInput] = useState('');
    const [taskStart, setTaskStart] = useState('');
    const [taskEnd, setTaskEnd] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                const response = await fetch(`/Checklist/CheckAPI`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        if (taskInput.trim() === '' || taskStart.trim() === '' || taskEnd.trim() === '') {
            setError('Task description and start/end times cannot be empty.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`/Checklist/CheckAPI`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task: { text: taskInput, completed: false, taskStart, taskEnd },
                }),
            });
            const data = await response.json();
            setTasks([...tasks, { id: data.id, text: taskInput, completed: false, taskStart, taskEnd }]);
            setTaskInput('');
            setTaskStart('');
            setTaskEnd('');
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async (id: string) => {
        try {
            await fetch(`/Checklist/CheckAPI`, {
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
        <div className="p-8 max-w-lg mx-auto bg-gray-300 shadow-lg rounded-lg">
            <h2 className="text-xl text-black font-bold mb-4">Task Manager</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex flex-col gap-4 mb-4">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a task..."
                    className="p-2 text-black border rounded"
                />

                <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-2">
                        <label className="text-black font-medium">
                            Start: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={taskStart}
                            onChange={(e) => setTaskStart(e.target.value)}
                            placeholder="Start time"
                            className="p-2 text-black border rounded"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-black font-medium">
                            End: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={taskEnd}
                            onChange={(e) => setTaskEnd(e.target.value)}
                            placeholder="End time"
                            className="p-2 text-black border rounded"
                        />
                    </div>
                </div>

                <button onClick={addTask} disabled={loading} className="p-2 bg-blue-500 rounded">
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>

            {/* Toggle to show/hide completed tasks */}
            <div className="mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                    />
                    <span className="text-black">Show Completed Tasks</span>
                </label>
            </div>

            <ul>
                {tasks
                    .filter((task) => (showCompleted ? true : !task.completed))
                    .map((task) => (
                        <li key={task.id} className="flex justify-between items-center p-2 border-b">
                            <span className="text-black">{task.text} ({task.taskStart} - {task.taskEnd})</span>
                            <button onClick={() => removeTask(task.id)} className="text-red-500">X</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskManager;