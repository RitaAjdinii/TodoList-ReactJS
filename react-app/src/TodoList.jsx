import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState(["Eat breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("");
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim("") !== "") {
            setTasks([...tasks, newTask]);
            setNewTask(""); 
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function editTask(index) {
        setEditedTaskIndex(index);
        setNewTask(tasks[index]);
    }

    function saveEditedTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = newTask;
        setTasks(updatedTasks);
        setEditedTaskIndex(null);
        setNewTask("");
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <>
            <h1>Todo list</h1>
            <div className='to-do-list'>
                <input type="text" placeholder='Enter a task...' value={newTask} onChange={handleInputChange} />
                <button className='add-button' onClick={addTask}>Add</button>
                {editedTaskIndex !== null && (
                    <button className='save-button' onClick={() => saveEditedTask(editedTaskIndex)}>Save</button>
                )}
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editedTaskIndex === index ? (
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        ) : (
                            <span className='text'>{task}</span>
                        )}
                        {editedTaskIndex !== index && (
                            <>
                                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                                <button className='edit-button' onClick={() => editTask(index)}>Edit</button>
                                <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
                                <button className='move-button' onClick={() => moveTaskDown(index)}>Down</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </>
    );
}

export default TodoList;
