import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBWhaNuCRehgFtstpMZWZ4ZcGXGjpaQHJ8",
    authDomain: "dosaaf-2dec9.firebaseapp.com",
    databaseURL: "https://dosaaf-2dec9.firebaseio.com",
    projectId: "dosaaf-2dec9",
    storageBucket: "dosaaf-2dec9.appspot.com",
    messagingSenderId: "760659706206",
    appId: "1:760659706206:web:9272cf4c68ea19e0cdcfcf",
    measurementId: "G-N8832DBEXH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage().ref();
const auth = firebase.auth();

// db.settings({ timestampsInSnapshots: true });

export { db, storage, auth };