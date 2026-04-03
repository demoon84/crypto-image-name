const fs = require('fs');

const findChangeList = (entryPath) => {
	const findList = [];

	const readFolder = (currentPath) => {
		const items = fs.readdirSync(currentPath).sort();

		items.forEach((item) => {
			const nowSrc = `${currentPath}/${item}`;

			if (fs.lstatSync(nowSrc).isDirectory()) {
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
		const excludeList = changeList.filter((item) => item.match(regex));

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
