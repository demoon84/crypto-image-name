#!/usr/bin/env node

const cryptoRun = require('../src/crypto-run');

cryptoRun({
	entry: process.argv[2] || './dist',
	output: process.argv[3] || './dist-crypto',
	secretKey: process.argv[4] || 'kyungtae'
});

console.log('finish crypto image');
