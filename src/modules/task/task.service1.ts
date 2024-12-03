import {  Task } from './schema/task.schema';
import { TaskInput, TaskFilterInput } from './interface/task-input.interface';
import * as fs from 'fs';
import * as path from 'path';

// Define the file path where tasks will be stored as backup
const TASKS_FILE_PATH = path.join(__dirname, '../../../persistent_data/tasks.json');

// Read tasks from the JSON file
const readTasksFromFile = async (): Promise<any[]> => {
    try {
        const data = await fs.promises.readFile(TASKS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return an empty array
        return [];
    }
};

// Write tasks to the JSON file
const writeTasksToFile = async (tasks: any[]): Promise<void> => {
    try {
        await fs.promises.writeFile(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));
    } catch (error) {
        throw new Error('Error writing tasks to file');
    }
};

// Task 2: Create a new task (stores in MongoDB and also updates the backup file)
export const createTask = async (taskData: TaskInput): Promise<any> => {
    try {
        // Create task in MongoDB
        const task = await Task.create(taskData);
        await task.save(); // Automatically generates 'id' using uuidv4

        // Read current tasks from the JSON file
        const tasks = await readTasksFromFile();

        // Add the newly created task to the backup array
        tasks.push(task);

        // Write the updated task list to the JSON file (backup)
        await writeTasksToFile(tasks);

        // Return the task created in MongoDB
        return task;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error creating task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while creating the task');
        }
    }
};

// Task 3: Get all tasks, optionally filtered by title, description, or status (from MongoDB)
export const getAllTasks = async (filter?: TaskFilterInput): Promise<any[]> => {
    try {
        // Get tasks from MongoDB
        const tasks = await Task.find({ ...filter });

        return tasks;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching tasks: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching tasks');
        }
    }
};

// Task 4: Update the status of a task in MongoDB and update the backup JSON file
export const updateTaskStatus = async (taskId: string, statusInput: string): Promise<any> => {
    try {
        // Update task status in MongoDB
        const task = await Task.updateOne({ id: taskId }, { status: statusInput }, { new: true });

        if (!task) {
            throw new Error('Task not found');
        }

        // Read current tasks from the JSON file
        const tasks = await readTasksFromFile();

        // Find and update the task in the backup array
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = statusInput;  // Update the status in the backup array
        }

        // Write the updated tasks back to the JSON file (backup)
        await writeTasksToFile(tasks);

        return task; // Return the updated task from MongoDB
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error updating task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while updating the task');
        }
    }
};


// Task 5: Delete a task from MongoDB and update the backup JSON file
export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        // Delete the task from MongoDB
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            throw new Error('Task not found');
        }

        // Read current tasks from the JSON file
        const tasks = await readTasksFromFile();

        // Filter out the task that was deleted
        const updatedTasks = tasks.filter(t => t.id !== taskId);

        // Write the updated tasks back to the JSON file (backup)
        await writeTasksToFile(updatedTasks);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error deleting task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while deleting the task');
        }
    }
};

// Task 6: Get tasks by their status (either 'pending' or 'completed')
export const getTasksByStatus = async (status: string): Promise<any[]> => {
    try {
        // Get tasks from MongoDB filtered by status
        const tasks = await Task.find({ status });

        return tasks;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching tasks by status: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching tasks by status');
        }
    }
};
