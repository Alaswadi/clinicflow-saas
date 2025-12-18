import { Client, Account, Databases } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.warn('Appwrite environment variables are missing. Please check your .env.local file.');
}

const client = new Client();

client
    .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
    .setProject(projectId || '');

export const account = new Account(client);
export const databases = new Databases(client);
export { client };

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
export const COLLECTIONS = {
    PATIENTS: import.meta.env.VITE_APPWRITE_COLLECTION_PATIENTS_ID || '',
    APPOINTMENTS: import.meta.env.VITE_APPWRITE_COLLECTION_APPOINTMENTS_ID || '',
};
