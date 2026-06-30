//firebase.database().ref('/info').set
/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_authenticate() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            GLOBAL_user = result.user;
            document.getElementById("welcomeMessage").innerHTML =
                "Welcome " + GLOBAL_user.displayName;
            console.log("Login successful");
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
}
//
function fb_write() {
    if (!GLOBAL_user) {
        alert("Please login first!");
        return;
    }
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    // EMPTY FIELD CHECK
    if (name == "" || age == "") {
        alert("Please fill in all fields!");
        return;
    }
    // AGE VALIDATION
    if (age < 10 || age > 99) {
        alert("Age must be between 10 and 99!");
        return;
    }
    firebase.database()
        .ref("users/" + GLOBAL_user.uid)
        .set({
            name: name,
            age: Number(age),
            displayName: GLOBAL_user.displayName,
            email: GLOBAL_user.email,
            photoURL: GLOBAL_user.photoURL
        })
        .then(() => {
            document.getElementById("statusMessage").innerHTML =

                "Saved successfully";
        })
        .catch((error) => {
            alert(error.message);
        });
}
//
function saveScore(gameName, playerScore) {
    if (!GLOBAL_user) {
        alert("Please login first!");
        return;
    }
    let scoreID = firebase.database()
        .ref("scores")
        .push()
        .key;
    firebase.database()
        .ref("scores/" + scoreID)
        .set({
            uid: GLOBAL_user.uid,
            player: GLOBAL_user.displayName,
            game: gameName,
            score: playerScore,
            date: new Date().toString()
        })
        .then(() => {
            console.log("Score saved!");
        })
        .catch((error) => {
            console.log(error);
        });
}