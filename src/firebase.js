import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions"
import { connectStorageEmulator, getStorage } from "firebase/storage"

//------------------------//
const firebaseConfig = {
  apiKey: "AIzaSyAKf5vNkc4QrCKZPHqbSFjJ0R4ZBPkWTl8",
  authDomain: "cp422021-students.firebaseapp.com",
  databaseURL: "https://cp422021-students-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cp422021-students",
  storageBucket: "cp422021-students.firebasestorage.app",
  messagingSenderId: "640131172549",
  appId: "1:640131172549:web:16a7c7a3f1a8f0d38448ac"
};
//------------------------//

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const storage = getStorage(app)

//const functions = getFunctions(app,"asia-southeast1")

const functions = getFunctions(app)

if (true) {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectFunctionsEmulator(functions, "localhost", 5001)
  connectStorageEmulator(storage, "localhost", 9199)
}

const call = async(functionName, params) => {
  try {
    let callableFunctions = httpsCallable(functions, functionName)
    let res = await callableFunctions(params)
    if (res.data.success) {
      return res.data
    } else if(res.data.success === false) {
      console.log(res.data.reason)
    }
    
  } catch (err) {
    console.log(err)
  }
}

export { app, auth, call, db, functions, storage }

