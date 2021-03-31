import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDr-J8NHXcGhH0b-2LvIvcHkSUH9WIQqZ0",
  authDomain: "whatsapp-2-9f290.firebaseapp.com",
  projectId: "whatsapp-2-9f290",
  storageBucket: "whatsapp-2-9f290.appspot.com",
  messagingSenderId: "68138590652",
  appId: "1:68138590652:web:1195c326352d20421f4bb9",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
