// --- Sign Up Logic ---
const signUpForm = document.querySelector('.sign-up-form');

if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents static HTML redirect

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('fullname').value; 

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Save initial user data to Firestore
                return db.collection('users').doc(user.uid).set({
                    fullName: fullName,
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                // Redirect on successful account creation
                window.location.href = 'new_user_dashboard.html';
            })
            .catch((error) => {
                alert('Sign Up Error: ' + error.message);
            });
    });
}

// ... (Continue with Sign In Logic below) ...


// --- Sign In Logic ---
const signInForm = document.querySelector('.sign-in-form');

if (signInForm) {
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents static HTML redirect

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Redirect to the full dashboard for logged-in users
                window.location.href = 'dashboard.html'; 
            })
            .catch((error) => {
                alert('Sign In Error: ' + error.message);
            });
    });
}