import { Task } from './schema/task.schema';
import { TaskInput, TaskFilterInput } from './interface/task-input.interface';
import { readTasksFromFile, writeTasksToFile } from '../../utils/file.utils';


// Task 2: Create a new task (stores in MongoDB and also updates the backup file)
export const createTask = async (taskData: TaskInput): Promise<any> => {
    try {
        const task = await Task.create(taskData);
        await task.save();

        const tasks = await readTasksFromFile();

        tasks.push(task);
        await writeTasksToFile(tasks);

        return task;
    } catch (error) {
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
        const tasks = await Task.find({ ...filter });

        return tasks;
    } catch (error) {
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
        const task = await Task.findOneAndUpdate({ id: taskId }, { status: statusInput }, { new: true });

        if (!task) {
            throw new Error('Task not found');
        }

        const tasks = await readTasksFromFile();

        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = statusInput;
        }

        await writeTasksToFile(tasks);

        return task;
    } catch (error) {
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
        const task = await Task.findOneAndDelete({ id: taskId });

        if (!task) {
            throw new Error('Task not found');
        }

        const tasks = await readTasksFromFile();

        const updatedTasks = tasks.filter(t => t.id !== taskId);

        await writeTasksToFile(updatedTasks);
    } catch (error) {
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
        const tasks = await Task.find({ status });
        return tasks;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching tasks by status: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching tasks by status');
        }
    }
};
