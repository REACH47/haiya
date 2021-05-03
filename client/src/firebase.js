import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAniQfDKfEfHrbnHf3Gow8gAwuBVrTg-Gk",
  authDomain: "haiya--dev.firebaseapp.com",
  databaseURL: "https://haiya--dev-default-rtdb.firebaseio.com",
  projectId: "haiya--dev",
  storageBucket: "haiya--dev.appspot.com",
  messagingSenderId: "12927986685",
  appId: "1:12927986685:web:7046cd2bbcaa74d3d7c794",
});

export const auth = app.auth();
export default app;
