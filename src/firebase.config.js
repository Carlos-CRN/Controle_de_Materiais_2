import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




const firebaseConfig = {
  apiKey: "AIzaSyBbyIK6Jb8DP-u9yDlCxJRHou6UDfATN_U",
  authDomain: "ceil-3d804.firebaseapp.com",
  projectId: "ceil-3d804",
  storageBucket: "ceil-3d804.appspot.com",
  messagingSenderId: "1038207629750",
  appId: "1:1038207629750:web:9b95fe3192688ada1c2917"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
export default app

