const fs = require('fs-extra');
const rename = require('rename');
const hmac = require('crypto-js/hmac-sha1');

const getPathList = require('./get-path-list');

const cryptoImageName = (entryPath, outputPath, images, privateKey) => {
	images.forEach((path) => {
		const {folderName, fileName, renameSrc, renameDist} = getPathList(entryPath, outputPath, path);

		const newName = rename(fileName, function() {
			return {
				basename: hmac(`${folderName}/${fileName.replace(`.${fileName.split('.')[1]}`, '')}`, privateKey).toString()
			};
		});

		fs.copy(renameSrc, `${renameDist}/${newName}`);
	});
};

module.exports = cryptoImageName;
