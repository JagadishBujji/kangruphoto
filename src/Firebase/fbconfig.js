// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuBXCOdDiNymq-xAtUVj4uimxpPWGq1Tw",
  authDomain: "kangruphoto-edd11.firebaseapp.com",
  databaseURL: "https://kangruphoto-edd11-default-rtdb.firebaseio.com",
  projectId: "kangruphoto-edd11",
  storageBucket: "kangruphoto-edd11.appspot.com",
  messagingSenderId: "351038069759",
  appId: "1:351038069759:web:f49437601d59164846e5ca",
  measurementId: "G-6B8LCZFDEH"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig); 
  const db = getFirestore(app);

export default app;
export {db};