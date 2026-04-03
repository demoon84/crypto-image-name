#!/usr/bin/env node

const cryptoRun = require('../src/crypto-run');
const {DEFAULT_OPTIONS, formatHelp, hasCliArgs, parseCliArgs} = require('../src/cli-options');
const inquirer = require('inquirer');

const questions = [
	{
		type: 'input',
		name: 'entry',
		message: 'entry path',
		default: DEFAULT_OPTIONS.entry
	},
	{
		type: 'input',
		name: 'output',
		message: 'output path',
		default: DEFAULT_OPTIONS.output
	},
	{
		type: 'input',
		name: 'privateKey',
		message: 'private key',
		default: DEFAULT_OPTIONS.privateKey
	},
	{
		type: 'input',
		name: 'excludePattern',
		message: 'exclude pattern',
		default: DEFAULT_OPTIONS.excludePattern
	}
];

const printError = (error, json) => {
	if (json) {
		console.error(JSON.stringify({
			error: error.message
		}, null, 2));
		return;
	}

	console.error(error.message);
	console.error('Run "cryptoimage --help" to see available options.');
};

const run = async () => {
	const argv = process.argv.slice(2);
	const interactiveMode = !hasCliArgs(argv);

	if (interactiveMode) {
		const answers = await inquirer.prompt(questions);
		cryptoRun({
			...answers
		});
		return;
	}

	const options = parseCliArgs(argv);

	if (options.help) {
		console.log(formatHelp());
		return;
	}

	const result = cryptoRun({
		entry: options.entry,
		output: options.output,
		privateKey: options.privateKey,
		excludePattern: options.excludePattern,
		silent: options.json
	});

	if (options.json) {
		console.log(JSON.stringify(result, null, 2));
	}
};

run().catch((error) => {
	const argv = process.argv.slice(2);
	const wantsJson = argv.indexOf('--json') > -1;

	printError(error, wantsJson);
	process.exitCode = 1;
});

