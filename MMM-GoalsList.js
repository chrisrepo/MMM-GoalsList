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
			Log.log("GOALS_DATA payload: "+ payload);
			this.goals = payload;
			this.updateDom();
		}
	},
	
	getDom: function() {
		var wrapper = document.createElement("div");
		Log.log("this.goals: " + this.goals);
		Log.log("this.goals stringify: " + JSON.stringify(this.goals));
		wrapper.innerHTML = JSON.stringify(this.goals);
		return wrapper;
	}
});