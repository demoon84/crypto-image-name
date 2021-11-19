const fs = require('fs');

const findList = [];

const readFolder = (path) => {
	const items = fs.readdirSync(path);

	items.forEach((item) => {
		const nowSrc = path + '/' + item;

		if (fs.lstatSync(path + '/' + item).isDirectory()) {
			readFolder(nowSrc);
		}
		else {
			findList.push(nowSrc);
		}
	});
};

const findFiles = (path) => {
	readFolder(path);

	return findList;
};

module.exports = findFiles;
