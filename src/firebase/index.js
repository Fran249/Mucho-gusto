import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCeGTKFCscJlLKPl2LEITVVCQZaxw_oU0",
  authDomain: "prueba-auth-vuex-router.firebaseapp.com",
  projectId: "prueba-auth-vuex-router",
  storageBucket: "prueba-auth-vuex-router.appspot.com",
  messagingSenderId: "184901051080",
  appId: "1:184901051080:web:0677b9175937de17a97bfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}
export {firebaseConfig}

