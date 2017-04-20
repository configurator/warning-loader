# warning-loader

A webpack loader that produces warnings according to script rules.

### Installation

	npm install --save-dev warning-loader

### Usage

Implement a warning function using the API at the bottom:

	var customWarnings = function () {
		if (/\/error.js$/.test(filename)) {
			this.error('The file error.js should never be required.');
		}

		if (this.text === '') {
			this.warning('Module is empty');
		}

		if (this.testRegex(/todo/i)) {
			this.warning('File contains a TODO');
		}
	};

In webpack's config, add the loader:

	use: {
		loader: 'warning-loader',
		options: {
			any: customWarnings
		}
	}

The key within the `options` (`any` in this example) does not matter; if multiple are present,
all are called, so we can use multiple test functions.

Note that this loader will never modify its input, and is always cacheable. This means your function
may not be called again for the same input (during the same webpack run or when using the caching
plugin [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)) - warnings
will remain the same as the last time the module was compiled.

### API

Within the warning function, the context (`this`) is given a simple API:

	this.warning('Message'): emits a warning
	this.error('Message'): emits an error

	this.filename: The current module's filename
	this.text: The current module's text, as a string
	this.includes('text'): Returns true if any line in the current module includes the string
	this.testRegex(/regex/): Returns true if any line in the current module matches the regex
