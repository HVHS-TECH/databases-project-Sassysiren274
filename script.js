function openJumpUp() {
    if (GLOBAL_user) {
        window.location.href = "JumpUp.html";
    } else {
        alert("Please log in first!");
    }
}

function openGeoDash() {
    if (GLOBAL_user) {
        window.location.href = "GeoDash.html";
    } else {
        alert("Please log in first!");
    }
}