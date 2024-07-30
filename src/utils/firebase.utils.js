import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeAVq2AoFijBgB7xbCmvYQl_3Z4z_Zpvk",
  authDomain: "ecommer-crwn.firebaseapp.com",
  projectId: "ecommer-crwn",
  storageBucket: "ecommer-crwn.appspot.com",
  messagingSenderId: "491518192721",
  appId: "1:491518192721:web:aac3c3461a1e17969f9c70"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()) {
    const {displayName , email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, 
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Erro to create the user: ", error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email , password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

 return await signInWithEmailAndPassword(auth, email , password);
};