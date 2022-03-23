const path = require('path');

const cryptoList = {
	text: [],
	images: [],
	files: []
};

const cryptoText = (src) => {
	const srcList = (/^win/.test(process.platform) ? src.replace(/\\/g, '\/') : src).split('/');
	const folderName = srcList[srcList.length - 2];
	const fileName = srcList[srcList.length - 1];

	if (cryptoList.text.indexOf(`${folderName}/${fileName}`) > -1) return;
	cryptoList.text.push(`${folderName}/${fileName}`);
};

const createList = (srcList) => {
	srcList.forEach((src) => {
		const ext = path.extname(src);

		if (/\.DS_Store$/.test(src)) {
			return;
		}

		if ((/\.(jpg|png|jpge|gif|webp)$/.test(ext))) {
			cryptoText(src);
			cryptoList.images.push(src);
		}

		if ((/\.(css|js|html|txt|vue|jsx)$/.test(ext))) {
			cryptoList.files.push(src);
		}
	});

	return cryptoList;
};

module.exports = createList;
