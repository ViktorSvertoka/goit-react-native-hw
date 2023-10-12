import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDGFJo7XBSTSpIsdzyG9qiAES3N630LdVY',
  authDomain: 'native-v2-3fc9a.firebaseapp.com',
  databaseURL:
    'https://native-v2-3fc9a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'native-v2-3fc9a',
  storageBucket: 'native-v2-3fc9a.appspot.com',
  messagingSenderId: '172387015447',
  appId: '1:172387015447:web:83ea4b3500d081df613552',
  measurementId: 'G-SWZTDG1C1N',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
