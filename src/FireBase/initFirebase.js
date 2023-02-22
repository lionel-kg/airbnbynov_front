import firebase from "firebase/compat/app";
// the below imports are option - comment out what you don't need
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/analytics'
import 'firebase/compat/performance'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

    if (!firebase.apps.length) {
        firebase.initializeApp(clientCredentials)
        
        // Check that `window` is in scope for the analytics module!
        console.log('Firebase was successfully init.')
    }

    const fireStorage = firebase.storage();

    export {fireStorage}