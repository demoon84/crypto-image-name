const cryptoRun = require('./src/crypto-run');

class CryptoName {
	constructor(config) {
		this.$config = {
			secretKey: 'kyungtae',
			entry: './dist',
			output: './dist_crypto',
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
