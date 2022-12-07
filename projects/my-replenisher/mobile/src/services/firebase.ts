import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDc9x5PWlVIynmuHR_3nitTeA0w6s4Ywn4",
  authDomain: "my-replenisher.firebaseapp.com",
  databaseURL: "https://my-replenisher-default-rtdb.firebaseio.com",
  projectId: "my-replenisher",
  storageBucket: "my-replenisher.appspot.com",
  messagingSenderId: "622220978106",
  appId: "1:622220978106:web:a5de8cea9a771693ed5f83",
  measurementId: "G-15FVNLD60C",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };