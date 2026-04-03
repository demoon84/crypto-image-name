const fs = require('fs-extra');
const getPathList = require('./get-path-list');
const {createAssetManifest} = require('./create-crypto-path');

const escapeRegExp = (value) => {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createReplacementMatcher = (textList, privateKey) => {
	const assetManifest = createAssetManifest(textList, privateKey);
	const pattern = [...assetManifest.keys()]
		.sort((left, right) => right.length - left.length)
		.map(escapeRegExp)
		.join('|');

	return {
		assetManifest,
		regex: pattern ? new RegExp(pattern, 'g') : null
	};
};

const replaceTextReferences = (content, matcher) => {
	let replacements = 0;

	if (!matcher.regex) {
		return {
			content,
			replacements
		};
	}

	return {
		content: content.replace(matcher.regex, (match) => {
			replacements += 1;
			return matcher.assetManifest.get(match);
		}),
		replacements
	};
};

const cryptoReplaceText = (entryPath, outputPath, files, matcher) => {
	let replacementCount = 0;
	const copiedFiles = files.map((filePath) => {
		const {fileName, renameSrc, renameDist} = getPathList(entryPath, outputPath, filePath);
		const outputFile = `${renameDist}/${fileName}`;

		fs.copySync(renameSrc, outputFile);

		const originalContent = fs.readFileSync(outputFile, 'utf8');
		const result = replaceTextReferences(originalContent, matcher);

		if (result.content !== originalContent) {
			fs.writeFileSync(outputFile, result.content, 'utf8');
		}

		replacementCount += result.replacements;

		return {
			source: filePath,
			output: outputFile,
			replacements: result.replacements
		};
	});

	return {
		files: copiedFiles,
		replacements: replacementCount
	};
};

module.exports = {
	createReplacementMatcher,
	cryptoReplaceText
};
