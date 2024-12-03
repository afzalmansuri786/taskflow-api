import fs from 'fs';
import path from 'path';

const filepath = path.join(__dirname, '../../persistent_data/tasks.json');

export const readTasksFromFile = async (): Promise<any[]> => {
    try {
        const data = await fs.promises.readFile(filepath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeTasksToFile = async (tasks: any[]): Promise<void> => {
    try {
        await fs.promises.writeFile(filepath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        throw new Error('Error writing tasks to file');
    }
};