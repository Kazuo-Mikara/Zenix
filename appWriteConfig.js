import { Client, Account } from 'appwrite';

// Use Next.js public environment variables for values needed in the browser.
// Make sure these are defined in your environment (.env.local):
// NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID
const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6894d9db00069f493b99');

export const account = new Account(client);
export default client;
