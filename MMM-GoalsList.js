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
		this.goals = "test";
		this.addresses = [];
	},
	
	getStyles: function() {
		return ["goals.css"];
	},
	
	getHeader: function() {
		return 'test header';
	}

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
		var goals = "";
		if (this.goals['goals_main'] !== undefined) {
			goals = "1.." + this.goals['goals_main'];
		} else if  (this.goals.goals_main !== undefined) {
			goals = "2.." + this.goals.goals_main;
		} else if (this.goals[0] !== undefiend) {
			goals = "3.." + this.goals[0];
		}
		wrapper.innerHTML = goals + " x " + JSON.stringify(this.goals);
		return wrapper;
	}
});