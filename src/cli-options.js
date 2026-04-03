const DEFAULT_OPTIONS = Object.freeze({
	entry: './dist',
	output: './dist-crypto',
	privateKey: 'mkt',
	excludePattern: ''
});

const VALUE_OPTION_MAP = new Map([
	['-e', 'entry'],
	['--entry', 'entry'],
	['--entry-path', 'entry'],
	['-o', 'output'],
	['--output', 'output'],
	['--output-path', 'output'],
	['-k', 'privateKey'],
	['--private-key', 'privateKey'],
	['-x', 'excludePattern'],
	['--exclude', 'excludePattern']
]);

const FLAG_OPTION_MAP = new Map([
	['-h', 'help'],
	['--help', 'help'],
	['--json', 'json']
]);

const isOptionToken = (value) => {
	if (value === undefined) {
		return false;
	}

	const {name} = splitInlineValue(value);

	return FLAG_OPTION_MAP.has(name) || VALUE_OPTION_MAP.has(name);
};

const splitInlineValue = (arg) => {
	const equalIndex = arg.indexOf('=');

	if (equalIndex < 0) {
		return {name: arg, value: undefined};
	}

	return {
		name: arg.slice(0, equalIndex),
		value: arg.slice(equalIndex + 1)
	};
};

const parseCliArgs = (argv) => {
	const parsed = {
		...DEFAULT_OPTIONS,
		help: false,
		json: false
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		const {name, value: inlineValue} = splitInlineValue(arg);

		if (FLAG_OPTION_MAP.has(name)) {
			parsed[FLAG_OPTION_MAP.get(name)] = true;
			continue;
		}

		if (!VALUE_OPTION_MAP.has(name)) {
			throw new Error(`Unknown option: ${arg}`);
		}

		const value = inlineValue === undefined ? argv[index + 1] : inlineValue;

		if (value === undefined || (inlineValue === undefined && isOptionToken(value))) {
			throw new Error(`Missing value for option: ${name}`);
		}

		parsed[VALUE_OPTION_MAP.get(name)] = value;

		if (inlineValue === undefined) {
			index += 1;
		}
	}

	return parsed;
};

const hasCliArgs = (argv) => argv.length > 0;

const formatHelp = (binName = 'cryptoimage') => {
	return [
		'crypto-image-name CLI',
		'',
		`Usage: ${binName} [options]`,
		'',
		'Options:',
		'  -e, --entry, --entry-path <path>      Input directory (default: ./dist)',
		'  -o, --output, --output-path <path>    Output directory (default: ./dist-crypto)',
		'  -k, --private-key <value>             HMAC private key (default: mkt)',
		'  -x, --exclude <regex>                 Exclude file path pattern',
		'  --json                                Print machine-readable JSON result',
		'  -h, --help                            Show help',
		'',
		'Examples:',
		`  ${binName} --entry ./dist --output ./dist-crypto --private-key my-key`,
		`  ${binName} --entry=./dist --output=./dist-crypto --json`,
		`  ${binName} --json`,
		'',
		'With no options, the CLI falls back to interactive prompts.'
	].join('\n');
};

module.exports = {
	DEFAULT_OPTIONS,
	formatHelp,
	hasCliArgs,
	parseCliArgs
};
