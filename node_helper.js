/* Magic Mirror
 * Module: GoalsList
 *
 * By Chris Repanich
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const path = require("path");
const url = require("url");
const fs = require("fs");
const bodyParser = require("body-parser");

var defaultModules = require(path.resolve(__dirname + "/../default/defaultmodules.js"));

Module = {
	configDefaults: {},
	register: function (name, moduleDefinition) {
		// console.log("Module config loaded: " + name);
		Module.configDefaults[name] = moduleDefinition.defaults;
	}
};

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		var self = this;

		console.log("Starting node helper for: " + self.name);

		this.template = "";

		fs.readFile(path.resolve(__dirname + "/goals.html"), function(err, data) {
			self.template = data.toString();
		});
		this.createRoutes();
	},
	createRoutes: function() {
		var self = this;

		this.expressApp.use(bodyParser.json());

		this.expressApp.get("/goals.html", function(req, res) {
			if (self.template === "") {
				res.send(503);
			} else {
				res.contentType("text/html");
				res.send(self.template);
			}
		});

		this.expressApp.get("/goals_get", function(req, res) {
			var query = url.parse(req.url, true).query;

			self.answerGet(query, res);
		});
		
		this.expressApp.post("/goals_post", function(req, res) {
			var query = url.parse(req.url, true).query;

			self.answerPost(query, req, res);
		});
	},
	
	answerPost: function(query, req, res) {
		var self = this;
		if (query.data === "goals") {
			console.log("Saving goals to file");
			fs.writeFile(path.resolve(__dirname + "/goals.json"), JSON.stringify(req.body));
			res.send(JSON.stringify({"status": "success"}));

			console.log("Save successful.");
			console.log("Reloading goals...");
			self.sendSocketNotification("GOALS_DATA", req.body);
		}
	},
	
	loadGoals: function() {
		var self = this;

		fs.readFile(path.resolve(__dirname + "/goals.json"), function(err, data) {
			if (err) {
				if (self.in("no such file or directory", err.message)) {
					return;
				}
				console.log(err);
			} else {
				var goalData = JSON.parse(data.toString());
				console.log("Sending loadGoals notification...");
				self.sendSocketNotification("GOALS_DATA", goalData);
			}
		});
	},
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log("Notification Received - '" + notification + "'");
		if (notification === "REQUEST_GOALS_DATA")
		{
			//get goals from file
			self.loadGoals();
		}
	}
});