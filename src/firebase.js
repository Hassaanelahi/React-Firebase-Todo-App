// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRYJbPjKBjPjI8_5weCfhGIoNQJM-GAXs",
    authDomain: "todo-app-todo123.firebaseapp.com",
    projectId: "todo-app-todo123",
    storageBucket: "todo-app-todo123.appspot.com",
    messagingSenderId: "751779563167",
    appId: "1:751779563167:web:3b8b860891f5098fcd04aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {
    db
}