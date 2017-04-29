'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator(...args) {
  ScriptBase.apply(this, args);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {
  this.appTemplate('filter', 'scripts/filters/' + this.name);
  this.testTemplate('spec/filter', 'filters/' + this.name);
  this.addScriptToIndex('filters/' + this.name);
};
