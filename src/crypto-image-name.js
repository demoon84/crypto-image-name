const fs = require('fs-extra');

const getPathList = require('./get-path-list');
const {createCryptoFileName, getAssetReference} = require('./create-crypto-path');

const cryptoImageName = (entryPath, outputPath, images, options) => {
	const {assetManifest, privateKey} = options;

	return images.map((imagePath) => {
		const {folderName, fileName, renameSrc, renameDist} = getPathList(entryPath, outputPath, imagePath);
		const assetReference = getAssetReference(folderName, fileName);
		const hashedAssetPath = assetManifest.get(assetReference);
		const newName = hashedAssetPath
			? hashedAssetPath.slice(hashedAssetPath.lastIndexOf('/') + 1)
			: createCryptoFileName(folderName, fileName, privateKey);
		const outputFile = `${renameDist}/${newName}`;

		fs.copySync(renameSrc, outputFile);

		return {
			source: imagePath,
			output: outputFile,
			hashedName: newName
		};
	});
};

module.exports = cryptoImageName;
