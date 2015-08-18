#!/usr/bin/env node
var run = require("./install");

// hackish, just a quick bug fix for now
process.argv.push("--uninstall");

run();
