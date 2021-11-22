#!/usr/bin/env node

const cryptoRun = require('../src/crypto-run');
const inquirer = require('inquirer');

const questions = [
	{
		type: 'input',
		name: 'entry',
		message: 'entry path',
		default: './dist'
	},
	{
		type: 'input',
		name: 'output',
		message: 'dist path',
		default: './dist-crypto'
	},
	{
		type: 'input',
		name: 'privateKey',
		message: 'private key',
		default: 'mkt'
	},
	{
		type: 'input',
		name: 'excludePattern',
		message: 'exclude pattern'
	}
];

inquirer.prompt(questions).then((answers) => {
	cryptoRun({
		...answers
	});
});


