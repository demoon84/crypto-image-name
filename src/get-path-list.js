const getPathList = (entryPath, outputPath, path) => {
	const pathList = (/^win/.test(process.platform) ? path.replace(/\\/g, '\/') : path).split('/');
	const folderName = pathList[pathList.length - 2];
	const fileName = pathList[pathList.length - 1];
	const dist = path.replace(entryPath, outputPath).replace(`/${fileName}`, '');
	const renameSrc = /^win/.test(process.platform) ? path.replace(/\\/g, '\/') : path;
	const renameDist = /^win/.test(process.platform) ? dist.replace(/\\/g, '\/') : dist;

	return {
		pathList,
		folderName,
		fileName,
		dist,
		renameSrc,
		renameDist
	};
};

module.exports = getPathList;
