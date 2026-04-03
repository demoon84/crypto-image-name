const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {createHmac} = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const cliPath = path.join(projectRoot, 'bin', 'crypto-image.js');
const fixturesRoot = path.join(projectRoot, 'test', 'fixtures');
const inputDir = path.join(fixturesRoot, 'input');
const outputDir = path.join(fixturesRoot, 'output');

const runCli = (args) => {
	return execFileSync('node', [cliPath, ...args], {
		cwd: projectRoot,
		encoding: 'utf8'
	});
};

const getHashedFileName = (folderName, fileName, privateKey) => {
	const extension = path.extname(fileName);
	const basename = path.basename(fileName, extension);
	const hash = createHmac('sha1', privateKey)
		.update(`${folderName}/${basename}`)
		.digest('hex');

	return `${hash}${extension}`;
};

const main = () => {
	fs.rmSync(outputDir, {recursive: true, force: true});

	const helpText = runCli(['--help']);
	assert.match(helpText, /--json/);
	assert.match(helpText, /With no options, the CLI falls back to interactive prompts\./);
	assert.strictEqual(
		require(projectRoot),
		require(path.join(projectRoot, 'src', 'crypto-run'))
	);

	const privateKey = 'ai-test-key';
	const hashedPngFileName = getHashedFileName('images', 'logo.main.png', privateKey);
	const hashedWebpFileName = getHashedFileName('images', 'logo.main.png.webp', privateKey);
	const result = JSON.parse(runCli([
		'--entry', inputDir,
		'--output', outputDir,
		'--private-key', privateKey,
		'--exclude', 'keep\\.png$',
		'--json'
	]));

	assert.equal(result.message, 'finish crypto image');
	assert.equal(result.imageCount, 2);
	assert.equal(result.textFileCount, 2);
	assert.equal(result.excludedFileCount, 1);
	assert.equal(result.replacementCount, 4);
	assert.deepEqual(
		result.renamedImages.map((item) => item.hashedName).sort(),
		[hashedPngFileName, hashedWebpFileName].sort()
	);
	assert.equal(result.copiedExcludedFiles.length, 1);

	const outputPngImage = path.join(outputDir, 'images', hashedPngFileName);
	const outputWebpImage = path.join(outputDir, 'images', hashedWebpFileName);
	const excludedImage = path.join(outputDir, 'images', 'keep.png');
	const outputCss = path.join(outputDir, 'app.css');
	const outputHtml = path.join(outputDir, 'page.html');

	assert.ok(fs.existsSync(outputPngImage));
	assert.ok(fs.existsSync(outputWebpImage));
	assert.ok(fs.existsSync(excludedImage));
	assert.ok(fs.existsSync(outputCss));
	assert.ok(fs.existsSync(outputHtml));

	const css = fs.readFileSync(outputCss, 'utf8');
	const html = fs.readFileSync(outputHtml, 'utf8');

	assert.ok(css.includes(`images/${hashedPngFileName}`));
	assert.ok(css.includes(`images/${hashedWebpFileName}`));
	assert.ok(!css.includes('images/logo.main.png'));
	assert.ok(!css.includes('images/logo.main.png.webp'));
	assert.ok(html.includes(`images/${hashedPngFileName}`));
	assert.ok(html.includes(`images/${hashedWebpFileName}`));
	assert.ok(html.includes('images/keep.png'));

	fs.rmSync(outputDir, {recursive: true, force: true});

	console.log('CLI tests passed');
};

main();
