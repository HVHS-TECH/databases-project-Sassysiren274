firebase.auth().onAuthStateChanged(function(user){
if(user){
document.getElementById("playerName").innerHTML =
"Welcome " + user.displayName;
let uid = user.uid;
firebase.database()
.ref("scores")
.orderByChild("uid")
.equalTo(uid)
.on("value", function(snapshot){
let jumpHighScore = 0;
let geoHighScore = 0;
snapshot.forEach(function(child){
let data = child.val();
if(data.game == "Jump Up"){
if(data.score > jumpHighScore){
jumpHighScore = data.score;
}
}
if(data.game == "Geo Dash"){
if(data.score > geoHighScore){
geoHighScore = data.score;
}
}
});
// DISPLAY ONLY HIGH SCORES
document.getElementById("jumpTable").innerHTML = `
<tr>
<th>Game</th>
<th>High Score</th>
</tr>
<tr>
<td>🎮 Jump Up</td>
<td>${jumpHighScore}</td>
</tr>
`;
document.getElementById("geoTable").innerHTML = `
<tr>
<th>Game</th>
<th>High Score</th>
</tr>
<tr>
<td>🌍 Geo Dash</td>
<td>${geoHighScore}</td>
</tr>
`;
});
}
});