// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8l-MdhWHRITT7RTegZNShuNfLKikOadg",
    authDomain: "database-project--jalwa.firebaseapp.com",
    databaseURL: "https://database-project--jalwa-default-rtdb.firebaseio.com",
    projectId: "database-project--jalwa",
    storageBucket: "database-project--jalwa.firebasestorage.app",
    messagingSenderId: "432351260611",
    appId: "1:432351260611:web:b3aee5b5673ff79b3e1776",
    measurementId: "G-WY4KBYKPC4"
};
//
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
let GLOBAL_user = null;
auth.onAuthStateChanged(function (user) {
    GLOBAL_user = user;

    if (user) {
        document.getElementById("welcomeMessage").innerHTML =
            "Welcome " + user.displayName;
    }
});
