import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkjOfkvA0cEMO7Zv2HmAmgU1wsxB6y-dY",
  authDomain: "security-app-mj.firebaseapp.com",
  projectId: "security-app-mj",
  storageBucket: "security-app-mj.appspot.com",
  messagingSenderId: "942380928088",
  appId: "1:942380928088:web:92722d8556b5ed94234e2d",
  measurementId: "G-WYNH3812FL",
};

//Allows initialization to occour only if the app isnt initialized
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
