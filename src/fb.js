import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'
import 'firebase/auth'

import { firebaseConfig } from '../config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const auth = firebase.auth();

// db.settings({ timestampsInSnapshots: true });

export { db, storage, storageRef, auth };