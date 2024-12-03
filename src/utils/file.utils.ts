import fs from 'fs';
import path from 'path';

export const tasksFilePath = path.join(__dirname, '../../persistent_data/tasks.json'); // Path to your tasks.json file

export const readTasksFromFile = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        fs.readFile(tasksFilePath, 'utf-8', (err, data) => {
            if (err) {
                return reject('Error reading tasks file');
            }
            try {
                const tasks = JSON.parse(data);
                resolve(tasks);
            } catch (error) {
                reject('Error parsing tasks file');
            }
        });
    });
};

// Helper function to write tasks to the JSON file
export const writeTasksToFile = (tasks: any[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return reject('Error writing tasks to file');
            }
            resolve();
        });
    });
};

