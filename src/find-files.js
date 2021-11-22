const fs = require('fs');

const findChangeList = (entryPath) => {
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

	readFolder(entryPath);

	return findList;
};

const findFiles = (path, excludePattern) => {
	let changeList = findChangeList(path);

	if (excludePattern) {
		const regex = new RegExp(excludePattern, 'g');
		const excludeList = changeList.filter(path => path.match(regex));

		return {
			change: changeList.filter(item => excludeList.indexOf(item) < 0),
			exclude: excludeList
		};
	}

	return {
		change: changeList,
		exclude: false
	};
};

module.exports = findFiles;
