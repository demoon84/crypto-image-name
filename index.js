const cryptoRun = require('./src/crypto-run');

class CryptoName {
	constructor(config) {
		this.$config = {
			entry: './dist',
			output: './dist-crypto',
			privateKey: 'mkt',
			exclude: '',
			...config
		};
	}

	apply(compiler) {
		compiler.hooks.done.tap('crypto name', stats => {
			cryptoRun({
				entry: this.$config.entry,
				output: this.$config.output,
				privateKey: this.$config.privateKey,
				excludePattern: this.$config.exclude
			});
		});
	}
}

module.exports = CryptoName;
