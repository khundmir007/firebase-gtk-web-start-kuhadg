// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB0c94hsbGoGrp7_FMDWVtU86ePEuuY6LQ",
    authDomain: "firebajam007.firebaseapp.com",
    databaseURL: "https://firebajam007.firebaseio.com",
    projectId: "firebajam007",
    storageBucket: "firebajam007.appspot.com",
    messagingSenderId: "1006493669643",
    appId: "1:1006493669643:web:c565e5b580e8870bc3aa0e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// var firebaseConfig = {};

// firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID

  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      console.log(authResult)
      // Return false to avoid redirect.
      return false;
    }
  }
};

 const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen to RSVP button clicks
startRsvpButton.addEventListener("click",
 () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      ui.start("#firebaseui-auth-container", uiConfig);
 }
});

// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    startRsvpButton.textContent = "LOGOUT"
    //show guesbook if loggedin
    guestbookContainer.style.display = "block";
  }
  else {
    startRsvpButton.textContent = "RSVP"
     guestbookContainer.style.display = "none";
  }
});

// Listen to the form submission
form.addEventListener("submit", (e) => {
 // Prevent the default form redirect
 e.preventDefault();
 // Write a new message to the database collection "guestbook"
 firebase.firestore().collection("guestbook").add({
   text: input.value,
   timestamp: Date.now(),
   name: firebase.auth().currentUser.displayName,
   userId: firebase.auth().currentUser.uid
 })
 // clear message input field
 input.value = ""; 
 // Return false to avoid redirect
 return false;
});
