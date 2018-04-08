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
			$(input).appendTo("#mainGoals");
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
		$.ajax({
			type: "POST",
			url: 'modules/MMM-GoalsList/saveJson.php',
			data: {'goals' : strGoals},
			success: function (msg) 
			{ 
				console.log(msg)
			},
	        failure: function() {alert("Error!");}
		});
		
	});
}

function updateGoalsDiv(goals) {
	let i = goals.length - 1;
	let goal = goals[i];
	let text = goal.text;
	let id = "mainGoals"+i;
	let input = "<input class='goalInput' id='" + id + "' placeholder='Enter Goal' type='text' value='" + text + "'/>";
	$(input).appendTo("#mainGoals");
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
	let strGoals = JSON.stringify(data);
	post("post", "data=goals", data, function(result){
		Log.log("Result status: "+ result.status);
	});
	/*
	$.ajax({
		type: "POST",
		url: 'modules/MMM-GoalsList/saveJson.php',
		data: {'goals' : strGoals},
		success: function (msg) 
		{ 
			console.log(msg)
		},
		failure: function() {alert("Error!");}
	});*/
}

function post(route, params, data, callback, timeout) {
    var req = new XMLHttpRequest();
    var url = route + "?" + params;
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(data));
},