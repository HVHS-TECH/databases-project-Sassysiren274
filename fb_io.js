//firebase.database().ref('/info').set
/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_authenticate(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result)=>{
        console.log("Logged in!");
        GLOBAL_user = result.user;
        document.getElementById("welcomeMessage").innerHTML =
"Welcome " + result.user.displayName;
document.getElementById("profileBox").style.display = "block";
        
    })
    .catch((error)=>{
        console.log(error);
        alert(error.message);
    });
}

function fb_write(){
    if(!GLOBAL_user){
        alert("Please login first!");
        return;
    }

    let firstName =
    document.getElementById("firstName").value;

    let lastName =
    document.getElementById("lastName").value;

    let age =
    document.getElementById("age").value;

    firebase.database()

    .ref("users/" + GLOBAL_user.uid)

    .set({
        firstName:firstName,

        lastName:lastName,

        age:Number(age),

        displayName:GLOBAL_user.displayName,

        email:GLOBAL_user.email,

        photoURL:GLOBAL_user.photoURL
    })
    .then(()=>{
        document.getElementById("statusMessage").innerHTML =
        "Saved successfully!";
    })
    .catch((error)=>{
        alert(error.message);
    });
}

function saveScore(game, score){
    let scoreID =
    firebase.database()
    .ref("scores")
    .push()
    .key;
    firebase.database()
    .ref("scores/" + scoreID)
    .set({
        uid:GLOBAL_user.uid,
        game:game,
        score:score,
        date:new Date().toString()
    });
}