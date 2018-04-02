/* Magic Mirror
 * Module: GoalsList
 *
 * By Chris Repanich
 * MIT Licensed.
 */

function loadGoalsFromFile() {
	$.getJSON('goals.json', function(data) {
		$.each(data.goals_main, function(i, goal) {
			let text = goal.text;
			let id = "mainGoals"+i;
			//<input class="goalInput" id="input-1" placeholder="Enter Goal" type="text"/>
			let input = "<input class='goalInput' id='" + id + "' placeholder='Enter Goal' type='text' value='" + text + "'/>";
			$(input).appendTo("#mainGoals");
		});
	});
}