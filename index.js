const cryptoRun = require('./src/crypto-run');

class CryptoName {
	constructor(config) {
		this.$config = {
			entry: './dist',
			output: './dist-crypto',
			secretKey: 'mkt',
			...config
		};
	}

	apply(compiler) {
		compiler.hooks.done.tap('crypto name', stats => {
			cryptoRun({
				entry: this.$config.entry,
				output: this.$config.output,
				secretKey: this.$config.secretKey
			});
		});
	}
}

module.exports = CryptoName;
