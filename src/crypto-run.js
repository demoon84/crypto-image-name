const fs = require('fs-extra');

const findFiles = require('./find-files');
const createList = require('./create-list');
const cryptoImageName = require('./crypto-image-name');
const cryptoReplaceText = require('./crypto-replace-text');
const getPathList = require('./get-path-list');

const cryptoRun = ({entry, output, privateKey, excludePattern}) => {
	const fileList = findFiles(entry, excludePattern);

	const data = createList(fileList.change);

	cryptoImageName(entry, output, data.images, privateKey);

	cryptoReplaceText(entry, output, data.files, data.text, privateKey);

	if (fileList.exclude) {
		fileList.exclude.forEach((path) => {
			const {fileName, renameSrc, renameDist} = getPathList(entry, output, path);

			fs.copySync(renameSrc, `${renameDist}/${fileName}`);
		});
	}

	console.log('finish crypto image');
};

module.exports = cryptoRun;
