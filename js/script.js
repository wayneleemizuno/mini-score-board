/* GLOBAL VARIABLES */
let teams = [];
const currentYear = new Date().getFullYear();
const currentYearDisplay = document.getElementById("year");
currentYearDisplay.textContent = currentYear;

const welcomeMessage = document.querySelector(".welcome-message");

const saveRecordBtn = document.getElementById("save-record-btn");
saveRecordBtn.addEventListener("click", () => {
	saveRecords();
});

const clearRecordBtn = document.getElementById("clear-record-btn");
clearRecordBtn.addEventListener("click", () => {
	clearRecords();
});

const saveTeamNameBtn = document.getElementById("save-team-name-btn");
saveTeamNameBtn.addEventListener("click", () => {
	const teamNameInput = document.getElementById("team-name-input");
	const name = teamNameInput.value;
	welcomeMessage.style.display = "none";
	if (name === "") {
		const infoMessage = document.getElementById("info-message");
		infoMessage.textContent = "Please enter a team name";
		return;
	} else if (
		teams.find(
			(team) =>
				team.name.replace(/\s+/g, "").toLowerCase() ===
				name.replace(/\s+/g, "").toLowerCase()
		)
	) {
		const infoMessage = document.getElementById("info-message");
		infoMessage.textContent = "This team name already exists";
		return;
	} else {
		const infoMessage = document.getElementById("info-message");
		infoMessage.innerHTML = `You entered: <strong>${name}</strong>, please confirm.`;
		const showConfirmBtn = document.querySelector(".confirm-btns");
		showConfirmBtn.style.display = "flex";
		const confirmTeamNameBtn = document.getElementById("confirm-team-name-btn");
		confirmTeamNameBtn.onclick = () => {
			const infoMessage = document.getElementById("info-message");
			infoMessage.textContent = "";
			const showConfirmBtn = document.querySelector(".confirm-btns");
			showConfirmBtn.style.display = "none";
			saveTeamName(name);
			const welcomeMessage = document.querySelector(".welcome-message");
			welcomeMessage.style.display = "block";
		};
		const cancelTeamNameBtn = document.getElementById("cancel-team-name-btn");
		cancelTeamNameBtn.onclick = () => {
			const infoMessage = document.getElementById("info-message");
			infoMessage.textContent = "";
			const showConfirmBtn = document.querySelector(".confirm-btns");
			showConfirmBtn.style.display = "none";
			const welcomeMessage = document.querySelector(".welcome-message");
			welcomeMessage.style.display = "block";
		};
	}
});

/* GLOBAL FUNCTIONS */
function generateShortUUID() {
	return "xxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function saveTeamName(teamName) {
	const teamNameInput = document.getElementById("team-name-input");
	const newTeam = {
		name: teamName,
		score: 0,
		teamId: generateShortUUID(),
	};

	teams.push(newTeam);
	addTeamArea(newTeam);
	teamNameInput.value = "";
}

function addTeamArea(team) {
	//create team board in main area
	const mainSection = document.querySelector(".main-section");
	const newTeamName = team.name.toLowerCase().replace(/\s+/g, "-");
	const teamBoard = document.createElement("div");
	teamBoard.className = `team-board ${newTeamName}`;
	teamBoard.id = `team-${team.teamId}`;
	mainSection.appendChild(teamBoard);
	//create team name display
	const teamNameDisplayArea = document.createElement("div");
	teamNameDisplayArea.className = "team-name-area";
	teamBoard.appendChild(teamNameDisplayArea);
	const teamNameDisplay = document.createElement("h2");
	teamNameDisplay.className = "team-name-text";
	teamNameDisplay.textContent = team.name;
	teamNameDisplayArea.appendChild(teamNameDisplay);
	//create score display
	const scoreDisplay = document.createElement("div");
	scoreDisplay.className = `score-display ${newTeamName}`;
	teamBoard.appendChild(scoreDisplay);
	const teamScore = document.createElement("p");
	teamScore.className = `score ${newTeamName}`;
	teamScore.id = `score-${team.teamId}`;
	teamScore.textContent = team.score;
	scoreDisplay.appendChild(teamScore);
	//create score adjustment area
	const adjustScoreArea = document.createElement("div");
	adjustScoreArea.className = `adjust-score-area ${newTeamName}`;
	teamBoard.appendChild(adjustScoreArea);
	//create add buttons
	const addScore = document.createElement("div");
	addScore.className = `add-btns-area`;
	const addButtons = [1, 5].map((points) => {
		const button = document.createElement("button");
		button.className = "add-btn";
		button.textContent = `+${points}`;
		button.onclick = () => adjustScore(team.teamId, points);
		return button;
	});
	addButtons.forEach((button) => {
		addScore.appendChild(button);
	});
	adjustScoreArea.appendChild(addScore);
	//create minus buttons
	const minusScore = document.createElement("div");
	minusScore.className = `minus-btns-area`;
	const minusButtons = [1, 5].map((points) => {
		const button = document.createElement("button");
		button.className = "minus-btn";
		button.textContent = `-${points}`;
		button.onclick = () => adjustScore(team.teamId, -points);
		return button;
	});
	minusButtons.forEach((button) => {
		minusScore.appendChild(button);
	});
	adjustScoreArea.appendChild(minusScore);
	//create team management button area
	const teamManageBtns = document.createElement("div");
	teamManageBtns.className = `team-manage-btns ${newTeamName}`;
	teamBoard.appendChild(teamManageBtns);
	//create reset button
	const resetButton = document.createElement("button");
	resetButton.className = "reset-score-btn";
	resetButton.textContent = "Reset Score";
	resetButton.onclick = () => resetScore(team.teamId);
	teamManageBtns.appendChild(resetButton);
	//create delete button
	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-team-btn";
	deleteButton.textContent = "Delete Team";
	deleteButton.onclick = () => deleteTeam(team.teamId);
	teamManageBtns.appendChild(deleteButton);
	//create edit score button
	const editScoreButton = document.createElement("button");
	editScoreButton.className = "edit-score-btn";
	editScoreButton.textContent = "Edit Score";
	editScoreButton.onclick = () => editScore(team.teamId);
	teamManageBtns.appendChild(editScoreButton);
}

function adjustScore(teamId, points) {
	const team = teams.find((team) => team.teamId === teamId);
	team.score += points;
	const teamScore = document.getElementById(`score-${teamId}`);
	teamScore.textContent = team.score;
}

function resetScore(teamId) {
	const team = teams.find((team) => team.teamId === teamId);
	team.score = 0;
	const teamScore = document.getElementById(`score-${teamId}`);
	teamScore.textContent = team.score;
}

function editScore(teamId) {
	const team = teams.find((team) => team.teamId === teamId);
	const editScoreInput = prompt("Enter the new score", team.score);
	team.score = team.score = parseInt(editScoreInput, 10);
	const teamScore = document.getElementById(`score-${teamId}`);
	teamScore.textContent = team.score;
}

function deleteTeam(teamId) {
	const team = teams.find((team) => team.teamId === teamId);
	const teamBoard = document.getElementById(`team-${teamId}`);
	teamBoard.remove();
	teams = teams.filter((team) => team.teamId !== teamId);
}

function saveRecords() {
	const recordList = document.getElementById("record-list");
	if (teams.length === 0) {
		alert("Please add a team first");
		return;
	}
	const newRecordHistory = document.createElement("li");
	newRecordHistory.innerHTML = teams
		.map((team) => {
			return `<span>${team.name}: ${team.score}</span>`;
		})
		.join(" // ");
	recordList.appendChild(newRecordHistory);
}

function clearRecords() {
	const recordList = document.getElementById("record-list");
	recordList.innerHTML = "";
}
