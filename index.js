"use strict";

module.exports = function (source, inputSourceMap) {
	var loader = this;

	this.cacheable();

	var query = this.query;

	var context = {
		warning(message) {
			loader.emitWarning(new Error(message));
		},

		error(message) {
			loader.emitError(new Error(message));
		},

		get filename() {
			return loader.resourcePath;
		},

		get text() {
			return source;
		},

		includes(str) {
			return source.includes(str);
		},

		testRegex(regex) {
			if (!regex.flags.includes('m')) {
				regex = new RegExp(regex, regex.flags + 'm');
			}

			return regex.test(source);
		}
	};

	for (var key in query) {
		query[key].apply(context);
	}

	return source;
};
