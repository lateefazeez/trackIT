import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCOxRNL2RAR5rGGJID-uaYNOkIfHLC1euE",
  authDomain: "trackit-e79ed.firebaseapp.com",
  projectId: "trackit-e79ed",
  storageBucket: "trackit-e79ed.appspot.com",
  messagingSenderId: "518391102883",
  appId: "1:518391102883:web:90052e57e03771d1a5ee16"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services 
const trackitFirestore = firebase.firestore()
const trackitAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { trackitFirestore, trackitAuth, timestamp }