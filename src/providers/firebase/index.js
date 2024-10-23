import { initializeApp } from 'firebase/app';
import { config } from 'providers/config';

const firebaseConfig = { ...config.firebase };

export const app = initializeApp(firebaseConfig);
