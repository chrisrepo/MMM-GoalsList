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
	
	getScripts: function() {
		return [
		        'goals.js',
		        this.file('saveJson.php')
		        ];
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
		var goals = this.goals.goals_main;
		wrapper.innerHTML = JSON.stringify(goals);
		return wrapper;
	}
});