let scoreA = 0;
let scoreB = 0;
document.getElementById("team-a-score").textContent = scoreA;
document.getElementById("team-b-score").textContent = scoreB;

/* BUTTONS - ADJUST SCORE */
function add1A() {
	scoreA += 1;
	document.getElementById("team-a-score").textContent = scoreA;
}

function add3A() {
	scoreA += 3;
	document.getElementById("team-a-score").textContent = scoreA;
}

function add5A() {
	scoreA += 5;
	document.getElementById("team-a-score").textContent = scoreA;
}

function add10A() {
	scoreA += 10;
	document.getElementById("team-a-score").textContent = scoreA;
}

function minus1A() {
	scoreA -= 1;
	document.getElementById("team-a-score").textContent = scoreA;
}

function minus3A() {
	scoreA -= 3;
	document.getElementById("team-a-score").textContent = scoreA;
}

function minus5A() {
	scoreA -= 5;
	document.getElementById("team-a-score").textContent = scoreA;
}

function minus10A() {
	scoreA -= 10;
	document.getElementById("team-a-score").textContent = scoreA;
}

function add1B() {
	scoreB += 1;
	document.getElementById("team-b-score").textContent = scoreB;
}

function add3B() {
	scoreB += 3;
	document.getElementById("team-b-score").textContent = scoreB;
}

function add5B() {
	scoreB += 5;
	document.getElementById("team-b-score").textContent = scoreB;
}

function add10B() {
	scoreB += 10;
	document.getElementById("team-b-score").textContent = scoreB;
}

function minus1B() {
	scoreB -= 1;
	document.getElementById("team-b-score").textContent = scoreB;
}

function minus3B() {
	scoreB -= 3;
	document.getElementById("team-b-score").textContent = scoreB;
}

function minus5B() {
	scoreB -= 5;
	document.getElementById("team-b-score").textContent = scoreB;
}

function minus10B() {
	scoreB -= 10;
	document.getElementById("team-b-score").textContent = scoreB;
}

/* RESET TEAM SCORE */
function resetA() {
	scoreA = 0;
	document.getElementById("team-a-score").textContent = scoreA;
}

function resetB() {
	scoreB = 0;
	document.getElementById("team-b-score").textContent = scoreB;
}

/* BUTTON BOX */
// function save() {
// 	document.getElementById("records").textContent +=
// 		"A: " + scoreA + "; " + "B: " + scoreB + " / ";
// }

// function save() {
// 	const records = document.getElementById("records");
// 	const newRecord = "A: " + scoreA + "; " + "B: " + scoreB + " / ";
// 	records.innerHTML += newRecord + "<br>";
// }

// function save() {
// 	const records = document.getElementById("records");
// 	const newRecord = "A: " + scoreA + "; " + "B: " + scoreB + " / ";
// 	const newLine = document.createElement("div"); // Create a new div element
// 	newLine.textContent = newRecord; // Set the text content of the new div
// 	records.appendChild(newLine); // Append the new div to the records element
// }

function save() {
	const records = document.getElementById("records");
	const newRecord = "A: " + scoreA + " / " + "B: " + scoreB;
	const newLine = document.createElement("li"); // Create a new li element
	newLine.textContent = newRecord; // Set the text content of the new li
	records.appendChild(newLine); // Append the new li to the records element
}

function resetBoard() {
	scoreA = 0;
	document.getElementById("team-a-score").textContent = scoreA;
	scoreB = 0;
	document.getElementById("team-b-score").textContent = scoreB;
}

function resetRecords() {
	document.getElementById("records").textContent = "";
}
