// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from "firebase/auth";

import {
    getDoc, getFirestore, doc, setDoc, collection, writeBatch, query, getDocs
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBezOkKX1otcPs26V6HMGfvsza6XdI9V6c",
    authDomain: "crown-clothing-db-a16dd.firebaseapp.com",
    projectId: "crown-clothing-db-a16dd",
    storageBucket: "crown-clothing-db-a16dd.appspot.com",
    messagingSenderId: "519652360632",
    appId: "1:519652360632:web:fbf21d61663dd18e61cf4d"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async (table) => {
    const collectionRef = collection(db, table);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log(error, "error");
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = async (cb) => onAuthStateChanged(auth, cb);

