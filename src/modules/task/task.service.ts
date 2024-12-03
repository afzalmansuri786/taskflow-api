import { Task } from './schema/task.schema';
import { TaskFilterInput, TaskInput } from './interface/task-input.interface';
import { ITask } from './interface/task-schema.interface';

// Create a new task
export const createTask = async (taskData: TaskInput): Promise<ITask | any> => {
    try {
        // Create the task and directly return the saved task (no need for task.save())
        const task = await Task.create(taskData);
        return task;  // Automatically generates 'id' using uuidv4
    } catch (error) {
        // Improved error handling with type guard
        if (error instanceof Error) {
            throw new Error(`Error creating task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while creating the task');
        }
    }
};

// Fetch all tasks, optionally filtered by title, description, or status
export const getAllTasks = async (filter?: TaskFilterInput): Promise<ITask[]> => {
    try {
        // Find tasks that match the filter, if provided
        return await Task.find({ ...filter });
    } catch (error) {
        // Improved error handling with type guard
        if (error instanceof Error) {
            throw new Error(`Error fetching tasks: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching tasks');
        }
    }
};

// Update the status of an existing task
export const updateTaskStatus = async (taskId: string, statusInput: string): Promise<ITask | any> => {
    try {
        // Validate status input (status can only be 'pending' or 'completed')
        if (statusInput !== 'pending' && statusInput !== 'completed') {
            throw new Error('Invalid status value. Valid values are "pending" or "completed".');
        }

        // Update the task status and return the updated task
        const task = await Task.findOneAndUpdate(
            { id: taskId },  // Find task by its UUID `id`
            { status: statusInput },
            { new: true }  // Return the updated task
        );

        if (!task) throw new Error('Task not updated');
        return task;
    } catch (error) {
        // Improved error handling with type guard
        if (error instanceof Error) {
            throw new Error(`Error updating task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while updating the task');
        }
    }
};

// Delete a task by its id
export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        // Find the task by id and delete it
        const task = await Task.findOneAndDelete({ id: taskId });

        if (!task) throw new Error('Task not found');
    } catch (error) {
        // Improved error handling with type guard
        if (error instanceof Error) {
            throw new Error(`Error deleting task: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while deleting the task');
        }
    }
};

// Get tasks by their status (either 'pending' or 'completed')
export const getTasksByStatus = async (status: string): Promise<ITask[]> => {
    try {
        // Validate status input (status can only be 'pending' or 'completed')
        if (status !== 'pending' && status !== 'completed') {
            throw new Error('Invalid status value. Valid values are "pending" or "completed".');
        }

        // Find tasks with the given status and return them
        return await Task.find({ status });
    } catch (error) {
        // Improved error handling with type guard
        if (error instanceof Error) {
            throw new Error(`Error fetching tasks by status: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching tasks by status');
        }
    }
};
