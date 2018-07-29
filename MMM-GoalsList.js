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
			console.log("Notification recieved - 'GOALS_DATA'...");
			console.log("Updating DOM");
			this.goals = payload;
			this.updateDom();
		}
		if (notification === "IP_ADDRESSES") {
			this.addresses = payload;
		}
	},
	
	getDom: function() {
		console.log("Getting DOM...");
		var wrapper = document.createElement("div");
		wrapper.className = "mmListWrapper";
		var heading = document.createElement("h3");
		var headingText = document.createTextNode("Goals");
		heading.appendChild(headingText);
		var list = document.createElement("ul");
		var goals = this.goals.goals_main;
		goals.forEach(function(goal){
			var text = goal.text;
			var listElement = document.createElement("li");
			var textElement = document.createTextNode(text);
			listElement.appendChild(textElement);
			listElement.className = "mmListItem";
			list.appendChild(listElement);
		});
		var listFooter = document.createElement("span");
		listFooter.innerHTML = "Modify list at http://" + this.addresses[0] + ":8080/goals.html";
		listFooter.className = "mmListFooter";
		wrapper.appendChild(heading);
		wrapper.appendChild(list);
		wrapper.appendChild(listFooter);
		return wrapper;
	}
});