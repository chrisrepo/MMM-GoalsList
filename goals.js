/* Magic Mirror
 * Module: GoalsList
 *
 * By Chris Repanich
 * MIT Licensed.
 */

$(document).ready(function() {
  $.ajaxSetup({ cache: false });
}); 
 
function loadGoalsFromFile() {
	$.getJSON('modules/MMM-GoalsList/goals.json', function(data) {
		$.each(data.goals_main, function(i, goal) {
			let text = goal.text;
			let goalId = i;

			let input = document.createElement("input");
			input.className = "goalInput";
			input.id = goalId;
			input.type = "text";
			input.value = text;
			
			let remove = document.createElement("a");
			remove.id = goalId+"remove";
			remove.className = "removeGoal";
			remove.onclick= function () {
				removeGoal(goalId);
			};
			remove.innerHTML = "-";

			let inputContainer = document.createElement("div");
			inputContainer.className = "inputContainer";
			inputContainer.appendChild(input);
			inputContainer.appendChild(remove);
			$(inputContainer).appendTo("#mainGoals");
		});
	});
}

function addNewGoal() {
	$.getJSON('modules/MMM-GoalsList/goals.json', function(data) {
		let goals = data.goals_main;
		let newGoal = {text: "New*"};
		goals.push(newGoal);
		//let strGoals = JSON.stringify(data);
		updateGoalsDiv(goals);
		post("goals_post", "data=goals", data, function(result){
			Log.log("Save goal file result: "+ result.status);
		});
	});
}

function removeGoal(id) {
	$.getJSON('modules/MMM-GoalsList/goals.json', function(data) {
		let goals = data.goals_main;
		goals.remove(id);
		let strGoals = JSON.stringify(data);
		updateGoalsDiv(goals);
		post("goals_post", "data=goals", data, function(result){
			Log.log("Save goal file result: "+ result.status);
		});
	});
}

function updateGoalsDiv(goals) {
	let i = goals.length - 1;
	let goal = goals[i];
	let text = goal.text;
	let goalId = "mainGoals"+i;

	let input = document.createElement("input");
	input.className = "goalInput";
	input.id = goalId;
	input.type = "text";
	input.value = text;
	
	let remove = document.createElement("a");
	remove.id = goalId+"remove";
	remove.className = "removeGoal";
	remove.onclick= function () {
		removeGoal(goalId);
	};
	remove.innerHTML = "-";

	let inputContainer = document.createElement("div");
	inputContainer.className = "inputContainer";
	inputContainer.appendChild(input);
	inputContainer.appendChild(remove);
	$(inputContainer).appendTo("#mainGoals");
}

function saveGoals() {
	let inputs = document.getElementById('mainGoals').getElementsByTagName('input');
	let goals = [];
	$.each(inputs, function(i, input){
		let textVal = input.value;
		let goal = {"text":textVal};
		goals.push(goal);
	});
	let data = {"goals_main":goals};
	post("goals_post", "data=goals", data, function(result){
		Log.log("Save goal file result: "+ result.status);
	});
}

function post(route, params, data, callback, timeout) {
    var req = new XMLHttpRequest();
    var url = route + "?" + params;
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(data));
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}