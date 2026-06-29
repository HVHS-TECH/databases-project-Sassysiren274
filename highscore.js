const scoreTable =
document.getElementById("scoreTable");
firebase.database()
.ref("scores")
.orderByChild("score")
.on("value", function(snapshot){
scoreTable.innerHTML = `
<tr>
<th>Player</th>
<th>Game</th>
<th>Score</th>
</tr>
`;
let scores=[];
snapshot.forEach(function(child){
let data = child.val();
scores.push(data);
});
scores.reverse();
scores.forEach(function(score){
let row =
scoreTable.insertRow();

row.insertCell(0).innerHTML =
score.uid;
row.insertCell(1).innerHTML =
score.game;
row.insertCell(2).innerHTML =
score.score;
});
});