let table =
document.getElementById("scores");
firebase.database()
.ref("scores")
.orderByChild("score")
.on("value", function(snapshot){

let scores=[];
snapshot.forEach(function(child){
scores.push(child.val());
});
scores.reverse();
scores.forEach(function(data){

let row =
table.insertRow();
row.insertCell(0).innerHTML =
data.player;
row.insertCell(1).innerHTML =
data.game;
row.insertCell(2).innerHTML =
data.score;
});
});