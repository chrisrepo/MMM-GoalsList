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
const exec = require("child_process").exec;
const os = require("os");
const simpleGit = require("simple-git");
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

		// load fall back translation
		self.loadTranslation("en");

		this.configOnHd = {};
		this.configData = {};

		this.waiting = [];

		this.template = "";
		this.modulesAvailable = [];
		this.modulesInstalled = [];

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
				var transformedData = self.fillTemplates(self.template);
				res.send(transformedData);
			}
		});

		this.expressApp.get("/get", function(req, res) {
			var query = url.parse(req.url, true).query;

			self.answerGet(query, res);
		});
	},