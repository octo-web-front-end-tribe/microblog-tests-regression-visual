'use strict';
var phantomcss = require('phantomcss');

function clearStorage() {
    phantom.clearCookies();
    casper.evaluate(function() {
        localStorage.clear();
        sessionStorage.clear();
    });
}

module.exports = {
	baseUrl: 'http://localhost:4200',
	width : 500,
	height: 700,
	init: function(width, height) {
		phantomcss.init({
		    mismatchTolerance: 1,
		    screenshotRoot: './screenshots'
		});
		casper.start(this.baseUrl, clearStorage);
		casper.viewport(width || this.width, height || this.height);
	},
	end: function() {
		casper.then(function now_check_the_screenshots() {
		    phantomcss.compareAll();
		});
		casper.then(function end_it() {
		    casper.test.done();
		});
		casper.run(function () {
		    phantom.exit(phantomcss.getExitStatus());
		});
	}
}