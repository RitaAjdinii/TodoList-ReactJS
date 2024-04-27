import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState(["Eat breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("");
    const [editedTask, setEditedTask] = useState({ index: null, text: "" });

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim("") !== "") {
            setTasks([...tasks, newTask]);
            setNewTask(""); // Clear the input field after adding a task
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function editTask(index) {
        setEditedTask({ index, text: tasks[index] });
    }

    function saveEditedTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask.text;
        setTasks(updatedTasks);
        setEditedTask({ index: null, text: "" });
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
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editedTask.index === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask.text}
                                    onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                                />
                                <button className='save-button' onClick={() => saveEditedTask(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className='text'>{task}</span>
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
