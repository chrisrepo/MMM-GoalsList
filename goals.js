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
			let id = "mainGoals"+i;
			//<input class="goalInput" id="input-1" placeholder="Enter Goal" type="text"/>
			let input = "<input class='goalInput' id='" + id + "' placeholder='Enter Goal' type='text' value='" + text + "'/>";
			let remove = "<a id='"+id+"remove' class='removeGoal' onClick='removeGoal("+id+")'>-</a>";
			$(input).appendTo("#mainGoals");
			$(remove).appendTo("#mainGoals");
		});
	});
}

function addNewGoal() {
	$.getJSON('modules/MMM-GoalsList/goals.json', function(data) {
		let goals = data.goals_main;
		let newGoal = {text: ""};
		goals.push(newGoal);
		let strGoals = JSON.stringify(data);
		updateGoalsDiv(goals);
		post("goals_post", "data=goals", data, function(result){
			Log.log("Save goal file result: "+ result.status);
		});
		
	});
}

function removeGoal(id) {
	document.removeElementById(id);
	document.removeElementById(id+"remove");
}

function updateGoalsDiv(goals) {
	let i = goals.length - 1;
	let goal = goals[i];
	let text = goal.text;
	let id = "mainGoals"+i;
	let input = "<input class='goalInput' id='" + id + "' placeholder='Enter Goal' type='text' value='" + text + "'/>";
	let remove = "<a id='"+id+"remove' class='removeGoal' onClick='removeGoal("+id+")'>-</a>";
	$(input).appendTo("#mainGoals");
	$(remove).appendTo("#mainGoals");
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