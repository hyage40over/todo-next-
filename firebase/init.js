// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoDx8rLwowfAnY8OFC9Fc9yUlk7lA1ewM",
  authDomain: "todo-next-firebase-28906.firebaseapp.com",
  projectId: "todo-next-firebase-28906",
  storageBucket: "todo-next-firebase-28906.appspot.com",
  messagingSenderId: "704879920179",
  appId: "1:704879920179:web:fe92f32fddd091a7df0f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
