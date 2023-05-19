import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAe0iarveZaolv2oajXvWKZRHQEwxi9sCI",
    authDomain: "cybercomplaintautosys.firebaseapp.com",
    projectId: "cybercomplaintautosys",
    storageBucket: "cybercomplaintautosys.appspot.com",
    messagingSenderId: "258386984575",
    appId: "1:258386984575:web:49768025b8f1633489894a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;