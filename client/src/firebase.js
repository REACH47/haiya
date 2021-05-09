import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAniQfDKfEfHrbnHf3Gow8gAwuBVrTg-Gk",
  authDomain: "haiya--dev.firebaseapp.com",
  databaseURL: "https://haiya--dev-default-rtdb.firebaseio.com",
  projectId: "haiya--dev",
  storageBucket: "haiya--dev.appspot.com",
  messagingSenderId: "12927986685",
  appId: "1:12927986685:web:7046cd2bbcaa74d3d7c794",
});

const firestore = app.firestore();
export const database = {
  files: firestore.collection("files"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const auth = app.auth();
export const storage = app.storage();
export default app;
