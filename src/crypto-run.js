const fs = require('fs-extra');
const path = require('path');

const findFiles = require('./find-files');
const createList = require('./create-list');
const cryptoImageName = require('./crypto-image-name');
const {createReplacementMatcher, cryptoReplaceText} = require('./crypto-replace-text');
const getPathList = require('./get-path-list');

const validateConfig = (entry, output) => {
	if (!fs.existsSync(entry)) {
		throw new Error(`Entry path does not exist: ${entry}`);
	}

	if (!fs.lstatSync(entry).isDirectory()) {
		throw new Error(`Entry path must be a directory: ${entry}`);
	}

	if (path.resolve(entry) === path.resolve(output)) {
		throw new Error('Output path must be different from the entry path.');
	}
};

const cryptoRun = ({entry, output, privateKey, excludePattern, silent = false}) => {
	validateConfig(entry, output);

	const fileList = findFiles(entry, excludePattern);
	const data = createList(fileList.change);
	const replacementMatcher = createReplacementMatcher(data.text, privateKey);
	const renamedImages = cryptoImageName(entry, output, data.images, {
		assetManifest: replacementMatcher.assetManifest,
		privateKey
	});
	const updatedFiles = cryptoReplaceText(entry, output, data.files, replacementMatcher);
	const copiedExcludedFiles = [];

	if (fileList.exclude) {
		fileList.exclude.forEach((excludedPath) => {
			const {fileName, renameSrc, renameDist} = getPathList(entry, output, excludedPath);
			const outputFile = `${renameDist}/${fileName}`;

			fs.copySync(renameSrc, outputFile);
			copiedExcludedFiles.push({
				source: excludedPath,
				output: outputFile
			});
		});
	}

	const summary = {
		message: 'finish crypto image',
		entry,
		output,
		processedFileCount: fileList.change.length,
		excludedFileCount: fileList.exclude ? fileList.exclude.length : 0,
		imageCount: renamedImages.length,
		textFileCount: updatedFiles.files.length,
		replacementCount: updatedFiles.replacements,
		renamedImages,
		updatedFiles: updatedFiles.files,
		copiedExcludedFiles
	};

	if (!silent) {
		console.log(summary.message);
	}

	return summary;
};

module.exports = cryptoRun;
