const fs = require('fs-extra');
const hmac = require('crypto-js/hmac-sha1');
const replace = require('replace-in-file');
const getPathList = require('./get-path-list');

const makeReplaceOptions = (textList, privateKey) => {
	const replaceOptions = {
		files: [],
		from: [],
		to: (...args) => {
			return `${args[0].split('/')[0]}/${hmac(args[0].split('.')[0], privateKey).toString()}.${args[0].split('.')[1]}`;
		},
		countMatches: true
	};

	textList.forEach((text) => {
		replaceOptions.from.push(new RegExp(text, 'g'));
	});

	return replaceOptions;
};

const cryptoReplaceText = (entryPath, outputPath, files, textList, privateKey) => {
	const replaceOptions = makeReplaceOptions(textList, privateKey);

	files.forEach((path) => {
		const {fileName, renameSrc, renameDist} = getPathList(entryPath, outputPath, path);
		fs.copySync(renameSrc, `${renameDist}/${fileName}`);
		replaceOptions.files.push(`${renameDist}/${fileName}`);
	});

	replace(replaceOptions);
};

module.exports = cryptoReplaceText;
