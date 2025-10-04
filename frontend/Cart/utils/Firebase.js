import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-27a45.firebaseapp.com",
  projectId: "loginonecart-27a45",
  storageBucket: "loginonecart-27a45.firebasestorage.app",
  messagingSenderId: "989030559387",
  appId: "1:989030559387:web:70e1f51dbb589f19c0e03e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider =  new GoogleAuthProvider()


export {auth , provider}