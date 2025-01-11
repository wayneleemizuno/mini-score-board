/* GLOBAL VARIABLES */
let teams = [];
const currentYear = new Date().getFullYear();
const currentYearDisplay = document.getElementById("year");
currentYearDisplay.textContent = currentYear;

const saveRecordBtn = document.getElementById("save-record-btn");
saveRecordBtn.addEventListener("click", saveRecords);

const clearRecordBtn = document.getElementById("clear-record-btn");
clearRecordBtn.addEventListener("click", clearRecords);

const saveTeamNameBtn = document.getElementById("save-team-name-btn");
saveTeamNameBtn.addEventListener("click", checkTeamName);

const teamNameInput = document.getElementById("team-name-input");
teamNameInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") checkTeamName();
});

/* FUNCTIONS */

// Team Management
function checkTeamName() {
	const name = teamNameInput.value;
	if (!name) {
		alert("Please enter a team name");
		return;
	}
	if (
		teams.some(
			(team) =>
				team.name.replace(/\s+/g, "").toLowerCase() ===
				name.replace(/\s+/g, "").toLowerCase()
		)
	) {
		alert("This team name already exists");
		return;
	}
	saveTeamName(name);
	teamNameInput.value = "";
}

function saveTeamName(name) {
	const newTeam = {
		name,
		score: 0,
		teamId: generateShortUUID(),
	};
	teams.push(newTeam);
	addTeamArea(newTeam);
}

function deleteTeam(teamId) {
	const teamIndex = teams.findIndex((team) => team.teamId === teamId);
	const teamName = teams[teamIndex].name;
	if (confirm(`Are you sure you want to delete ${teamName}?`)) {
		if (teamIndex > -1) {
			document.getElementById(`team-${teamId}`).remove();
			teams.splice(teamIndex, 1);
		}
		return false;
	}
}

function addTeamArea(team) {
	const mainSection = document.querySelector(".main-section");
	const teamBoard = createTeamBoardElement(team);
	mainSection.appendChild(teamBoard);
	assignTeamBoardColor(teamBoard, teams.length);
	createTeamNameDisplay(teamBoard, team);
	createScoreDisplay(teamBoard, team);
	createScoreAdjustmentArea(teamBoard, team);
	createTeamManagementArea(teamBoard, team);
}

function generateShortUUID() {
	return "xxxxxxxx".replace(/[xy]/g, (c) =>
		((Math.random() * 16) | 0).toString(16)
	);
}

// Score Management
function adjustScore(teamId, points) {
	const team = teams.find((team) => team.teamId === teamId);
	if (team) {
		team.score += points;
		updateScoreDisplay(team);
	}
}

function resetScore(teamId) {
	const team = teams.find((team) => team.teamId === teamId);
	if (team) {
		team.score = 0;
		updateScoreDisplay(team);
	}
}

function editScore(teamId) {
	const team = teams.find((team) => team.teamId === teamId);
	const newScore = parseInt(prompt("Enter the new score", team.score), 10);
	if (team && !isNaN(newScore)) {
		team.score = newScore;
		updateScoreDisplay(team);
	}
}

// Record Management
function saveRecords() {
	if (teams.length === 0) {
		alert("Please add a team first");
		return;
	}
	const recordList = document.getElementById("record-list");
	const newRecordHistory = document.createElement("li");
	newRecordHistory.innerHTML = teams
		.map(
			(team) =>
				`<span class="record-item"><span class="record-item-team-name">${team.name}</span> : <span class="record-item-team-score">${team.score}</span></span>`
		)
		.join(" | ");
	recordList.appendChild(newRecordHistory);
}

function clearRecords() {
	const recordList = document.getElementById("record-list");
	recordList.innerHTML = "";
}

// Helper Functions
function createTeamBoardElement(team) {
	const teamBoard = document.createElement("div");
	teamBoard.className = `team-board ${team.name
		.toLowerCase()
		.replace(/\s+/g, "-")}`;
	teamBoard.id = `team-${team.teamId}`;
	return teamBoard;
}

function assignTeamBoardColor(teamBoard, index) {
	const colorIndex = (index % 10) + 1;
	teamBoard.style.background = `var(--team-board-colour-${colorIndex})`;
	const activeBorderColor = `var(--btn-adjust-point-active-border-${colorIndex})`;
	const styleSheet = document.styleSheets[0];
	styleSheet.insertRule(
		`#${teamBoard.id} .add-btn:active, #${teamBoard.id} .minus-btn:active { border: 2px solid ${activeBorderColor}; }`,
		styleSheet.cssRules.length
	);
}

function createTeamNameDisplay(teamBoard, team) {
	const teamNameDisplayArea = document.createElement("div");
	teamNameDisplayArea.className = "team-name-area";
	teamBoard.appendChild(teamNameDisplayArea);
	const teamNameDisplay = document.createElement("h2");
	teamNameDisplay.className = "team-name-text";
	teamNameDisplay.textContent = team.name;
	teamNameDisplayArea.appendChild(teamNameDisplay);
}

function createTeamManagementArea(teamBoard, team) {
	const teamManageBtns = document.createElement("div");
	teamManageBtns.className = `team-manage-btns ${team.name
		.toLowerCase()
		.replace(/\s+/g, "-")}`;
	teamBoard.appendChild(teamManageBtns);

	const buttons = [
		{
			className: "reset-score-btn",
			text: "Reset Score",
			onClick: () => resetScore(team.teamId),
		},
		{
			className: "delete-team-btn",
			text: "Delete Team",
			onClick: () => deleteTeam(team.teamId),
		},
		{
			className: "edit-score-btn",
			text: "Edit Score",
			onClick: () => editScore(team.teamId),
		},
	];
	buttons.forEach(({ className, text, onClick }) => {
		const button = document.createElement("button");
		button.className = className;
		button.textContent = text;
		button.onclick = onClick;
		teamManageBtns.appendChild(button);
	});
}

function createScoreDisplay(teamBoard, team) {
	const scoreDisplay = document.createElement("div");
	scoreDisplay.className = `score-display ${team.name
		.toLowerCase()
		.replace(/\s+/g, "-")}`;
	teamBoard.appendChild(scoreDisplay);

	const teamScore = document.createElement("p");
	teamScore.className = `score ${team.name.toLowerCase().replace(/\s+/g, "-")}`;
	teamScore.id = `score-${team.teamId}`;
	teamScore.textContent = team.score;
	scoreDisplay.appendChild(teamScore);
}

function createScoreAdjustmentArea(teamBoard, team) {
	const adjustScoreArea = document.createElement("div");
	adjustScoreArea.className = `adjust-score-area ${team.name
		.toLowerCase()
		.replace(/\s+/g, "-")}`;
	teamBoard.appendChild(adjustScoreArea);

	const addScore = document.createElement("div");
	addScore.className = `add-btns-area`;
	const addButtons = [1, 5].map((points) =>
		createAdjustButton(points, team.teamId, true)
	);
	addButtons.forEach((button) => addScore.appendChild(button));
	adjustScoreArea.appendChild(addScore);

	const minusScore = document.createElement("div");
	minusScore.className = `minus-btns-area`;
	const minusButtons = [1, 5].map((points) =>
		createAdjustButton(points, team.teamId, false)
	);
	minusButtons.forEach((button) => minusScore.appendChild(button));
	adjustScoreArea.appendChild(minusScore);
}

function createAdjustButton(points, teamId, isAdd) {
	const button = document.createElement("button");
	button.className = isAdd ? "add-btn" : "minus-btn";
	button.textContent = `${isAdd ? "+" : "-"}${points}`;
	button.onclick = () => adjustScore(teamId, isAdd ? points : -points);
	return button;
}

function updateScoreDisplay(team) {
	const teamScore = document.getElementById(`score-${team.teamId}`);
	if (teamScore) teamScore.textContent = team.score;
}
