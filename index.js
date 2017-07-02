"use strict";

module.exports = function (source, inputSourceMap) {
	let loader = this;

	this.cacheable();

	let query = this.query;

	let context = {
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

	for (let key in query) {
		let func = query[key];
		if (typeof func === "function") {
			func.apply(context);
		}
	}

	return source;
};
