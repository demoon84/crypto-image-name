const path = require('path');

const IMAGE_PATTERN = /\.(jpg|jpeg|png|gif|webp)$/i;
const TEXT_PATTERN = /\.(css|js|html|txt|vue|jsx)$/i;

const cryptoText = (src, cryptoList, textSet) => {
	const srcList = (/^win/.test(process.platform) ? src.replace(/\\/g, '\/') : src).split('/');
	const folderName = srcList[srcList.length - 2];
	const fileName = srcList[srcList.length - 1];
	const assetPath = `${folderName}/${fileName}`;

	if (textSet.has(assetPath)) {
		return;
	}

	textSet.add(assetPath);
	cryptoList.text.push(assetPath);
};

const createList = (srcList) => {
	const cryptoList = {
		text: [],
		images: [],
		files: []
	};
	const textSet = new Set();

	srcList.forEach((src) => {
		const ext = path.extname(src);

		if (/\.DS_Store$/.test(src)) {
			return;
		}

		if (IMAGE_PATTERN.test(ext)) {
			cryptoText(src, cryptoList, textSet);
			cryptoList.images.push(src);
		}

		if (TEXT_PATTERN.test(ext)) {
			cryptoList.files.push(src);
		}
	});

	return cryptoList;
};

module.exports = createList;
