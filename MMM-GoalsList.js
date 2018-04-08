/* Magic Mirror
 * Module: GoalsList
 *
 * By Chris Repanich
 * MIT Licensed.
 */

Module.register("MMM-GoalsList", {
	requiresVersion: "2.1.0",
	
	//Default module config
	defaults: {
		
	},
	
	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.goals = {"goals_main": [
		                             {"text":"test1"},
		                             {"text":"test2"}]};
		this.addresses = [];
	},
	
	getStyles: function() {
		return ["goals.css"];
	},

	notificationReceived: function(notification, payload, sender) {
		if (sender) {
		} else { 
			if (notification === "DOM_OBJECTS_CREATED") {
				this.sendSocketNotification("REQUEST_GOALS_DATA");
			}
		}
	},
	
	socketNotificationReceived: function(notification, payload) {
		//update goals data
		if (notification === "GOALS_DATA") { 
			this.goals = payload;
			this.updateDom();
		}
	},
	
	getDom: function() {
		var wrapper = document.createElement("div");
		var goals = this.goals.goals_main;
		goals.forEach(function(goal){
			var text = goal.text;
			var textElement = document.createElement("div");
			textElement.innerHTML = text;
			wrapper.innerHTML = wrapper.innerHTML + textElement;
		});
		return wrapper;
	}
});