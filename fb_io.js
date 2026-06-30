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
GLOBAL_user = result.user;
document.getElementById("welcomeMessage").innerHTML =
"Welcome " + GLOBAL_user.displayName;
console.log("Login successful");
})
.catch((error)=>{
console.log(error);
alert(error.message);
});
}
function fb_write(){
if(!GLOBAL_user){
alert("Please login first");
return;
}
let name =
document.getElementById("name").value;
let age =
document.getElementById("age").value;
firebase.database()
.ref("users/" + GLOBAL_user.uid)
.set({
name:name,
age:Number(age),
displayName:GLOBAL_user.displayName,
email:GLOBAL_user.email,
photoURL:GLOBAL_user.photoURL

})
.then(()=>{
document.getElementById("statusMessage").innerHTML =
"Saved to database ✅";
})
.catch((error)=>{
alert(error.message);
});
}