//firebase.database().ref('/info').set
/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_write(){

    let firstName =
    document.getElementById("firstname").value;

    let lastName =
    document.getElementById("Last name").value;

    let age =
    document.getElementById("Age").value;

    let userID = GLOBAL_user.uid;

    firebase.database()
    .ref("users/" + userID)
    .set({
        firstName:firstName,
        lastName:lastName,
        age:Number(age),

        displayName:GLOBAL_user.displayName,
        email:GLOBAL_user.email,
        photoURL:GLOBAL_user.photoURL
    });
    document.getElementById("statusMessage").innerHTML =
    "Saved!";
}
function saveScore(game, score){
    let scoreID =
    firebase.database().ref("scores").push().key;
    firebase.database()
    .ref("scores/" + scoreID)
    .set({
        uid:GLOBAL_user.uid,
        game:game,
        score:score,
        date:new Date().toString()
    });
}