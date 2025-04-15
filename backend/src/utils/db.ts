import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(__dirname, '../data');

export async function readData(fileName: string) {
    const data = await fs.readFile(`${DATA_PATH}/${fileName}`, 'utf-8');
    return JSON.parse(data);
}

export async function writeData(fileName: string, data: any) {
    await fs.writeFile(
        `${DATA_PATH}/${fileName}`,
        JSON.stringify(data, null, 2)
    );
}