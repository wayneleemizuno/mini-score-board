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
// save function first version
// function save() {
// 	document.getElementById("records").textContent +=
// 		"A: " + scoreA + "; " + "B: " + scoreB + " / ";
// }

// save function 2nd ver.
// function save() {
// 	const records = document.getElementById("records");
// 	const newRecord = "A: " + scoreA + "; " + "B: " + scoreB + " / ";
// 	records.innerHTML += newRecord + "<br>";
// }

//save function 3rd ver.
// function save() {
// 	const records = document.getElementById("records");
// 	const newRecord = "A: " + scoreA + "; " + "B: " + scoreB + " / ";
// 	const newLine = document.createElement("div"); // Create a new div element
// 	newLine.textContent = newRecord; // Set the text content of the new div
// 	records.appendChild(newLine); // Append the new div to the records element
// }

//save function 4th ver.
// function save() {
// 	const records = document.getElementById("records");
// 	const newRecord = `<span class="score-a">A: ${scoreA}</span>
// 	<span class="score-seperator"> / </span>
// 	<span class="score-b">B: ${scoreB}</span>`;
// 	const newLine = document.createElement("li");
// 	newLine.innerHTML = newRecord;
// 	records.appendChild(newLine);
// }

//save function without using innerHTML
function save() {
	const records = document.getElementById("records");

	// Create a new list item
	const newLine = document.createElement("li");

	// Create span for Score A
	const scoreASpan = document.createElement("span");
	scoreASpan.className = "score-a";
	scoreASpan.textContent = "A: " + scoreA;

	// Create span for the slash
	const slashSpan = document.createElement("span");
	slashSpan.className = "score-seperator";
	slashSpan.textContent = " / ";

	// Create span for Score B
	const scoreBSpan = document.createElement("span");
	scoreBSpan.className = "score-b";
	scoreBSpan.textContent = "B: " + scoreB;

	// Append spans to the list item
	newLine.appendChild(scoreASpan);
	newLine.appendChild(slashSpan);
	newLine.appendChild(scoreBSpan);

	// Append the list item to the records
	records.appendChild(newLine);
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
