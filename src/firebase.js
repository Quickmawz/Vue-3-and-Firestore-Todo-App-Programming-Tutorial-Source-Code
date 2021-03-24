import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBYJ-EKGcP-J9OjSkkO1DCN8v2hViVto8Q",
  authDomain: "vue3-todo-app-81054.firebaseapp.com",
  projectId: "vue3-todo-app-81054",
  storageBucket: "vue3-todo-app-81054.appspot.com",
  messagingSenderId: "851028075131",
  appId: "1:851028075131:web:c9ba5ba3bbf8365bb078de",
  measurementId: "G-0HSHV86D2X"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

