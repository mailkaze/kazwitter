import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAq8JmcUO_sihGHAa94DoTTpwDCNDSL2y0",
  authDomain: "kazwitter-cff9d.firebaseapp.com",
  databaseURL: "https://kazwitter-cff9d.firebaseio.com",
  projectId: "kazwitter-cff9d",
  storageBucket: "kazwitter-cff9d.appspot.com",
  messagingSenderId: "1032703290512",
  appId: "1:1032703290512:web:79134f21291297061a7c15"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()
export const auth = fb.auth()