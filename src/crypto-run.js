const findFiles = require('./find-files');
const createList = require('./create-list');
const cryptoImageName = require('./crypto-image-name');
const cryptoReplaceText = require('./crypto-replace-text');

const cryptoRun = ({entry, output, secretKey}) => {
	const fileList = findFiles(entry);

	const data = createList(fileList);

	cryptoImageName(entry, output, data.images, secretKey);

	cryptoReplaceText(entry, output, data.files, data.text, secretKey);
};

module.exports = cryptoRun;
