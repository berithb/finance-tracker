 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from"https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA3PE8ASy_Gb2mWf5xbzLR_X5KTRER44SU",
    authDomain: "finance-tracker-c3b2a.firebaseapp.com",
    projectId: "finance-tracker-c3b2a",
    storageBucket: "finance-tracker-c3b2a.firebasestorage.app",
    messagingSenderId: "1063748265478",
    appId: "1:1063748265478:web:82546ea18ba6efbd760587"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML= message;
  messageDiv.style.opacity = 1;
  setTimeout(function(){
    messageDiv.style.opacity = 0;
  },5000);
}

  const signUp = document.getElementById('sign-up');
  signUp.addEventListener( 'click', (event)=>{
    event.preventDefault();
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const fullname= document.getElementById('fullname').value;

    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          fullname: fullname,
          password: password
        };
        showMessage("Account created successfully", 'signUpMessage');
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, userData)
          .then(() => {
            window.location.href = "index.html";
          })
          .catch((error) => {
            console.error("error writing document", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          showMessage('Email address already exists', 'signUpMessage');
        } else {
          showMessage('unable to create user', 'signUpMessage');
        }
      });
  });

// Sign-in handler for `index.html`
const signInForm = document.querySelector('.sign-in-form');
if (signInForm) {
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Signed in successfully', 'signInMessage');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        const code = error.code;
        if (code === 'auth/wrong-password' || code === 'auth/user-not-found') {
          showMessage('Invalid email or password', 'signInMessage');
        } else {
          showMessage('Unable to sign in', 'signInMessage');
        }
      });
  });
}