const path = require('path');
const hmac = require('crypto-js/hmac-sha1');

const getAssetReference = (folderName, fileName) => {
	return `${folderName}/${fileName}`;
};

const createHashedBasename = (folderName, fileName, privateKey) => {
	const parsed = path.parse(fileName);

	return hmac(`${folderName}/${parsed.name}`, privateKey).toString();
};

const createCryptoFileName = (folderName, fileName, privateKey) => {
	const parsed = path.parse(fileName);

	return `${createHashedBasename(folderName, fileName, privateKey)}${parsed.ext}`;
};

const createCryptoAssetPath = (assetPath, privateKey) => {
	const normalizedPath = assetPath.replace(/\\/g, '/');
	const lastSlashIndex = normalizedPath.lastIndexOf('/');
	const folderName = normalizedPath.slice(0, lastSlashIndex);
	const fileName = normalizedPath.slice(lastSlashIndex + 1);

	return getAssetReference(folderName, createCryptoFileName(folderName, fileName, privateKey));
};

const createAssetManifest = (assetPaths, privateKey) => {
	const hashedPaths = new Map();

	assetPaths.forEach((assetPath) => {
		hashedPaths.set(assetPath, createCryptoAssetPath(assetPath, privateKey));
	});

	return hashedPaths;
};

module.exports = {
	createAssetManifest,
	createCryptoAssetPath,
	createCryptoFileName,
	getAssetReference
};
