# crypto-image-name

Rename image files with an HMAC-based hash and rewrite matching asset paths inside text files.

This package is focused on CLI and automation use.

## What It Changes

- Image files are renamed to hashed filenames.
- References to those images are rewritten inside supported text files.
- Excluded files are copied without rewriting.

## Supported Files

### Images

- `.jpg`
- `.jpeg`
- `.png`
- `.gif`
- `.webp`

### Text Files

- `.css`
- `.js`
- `.html`
- `.txt`
- `.vue`
- `.jsx`

## CLI

### Install

```bash
npm install -g crypto-image-name
```

### Interactive Mode

Run with no arguments to use prompts:

```bash
cryptoimage
```

### Non-Interactive Mode

Run with explicit arguments for scripts, CI, or AI agents:

```bash
cryptoimage --entry ./dist --output ./dist-crypto --private-key my-key
```

### JSON Output

Use `--json` to print a machine-readable result:

```bash
cryptoimage --entry ./dist --output ./dist-crypto --json
```

Example response:

```json
{
  "message": "finish crypto image",
  "entry": "./dist",
  "output": "./dist-crypto",
  "processedFileCount": 12,
  "excludedFileCount": 1,
  "imageCount": 4,
  "textFileCount": 8,
  "replacementCount": 11
}
```

### CLI Options

| Option | Default | Description |
| ----- | ----- | ----- |
| `-e`, `--entry`, `--entry-path` | `./dist` | input directory |
| `-o`, `--output`, `--output-path` | `./dist-crypto` | output directory |
| `-k`, `--private-key` | `mkt` | HMAC private key |
| `-x`, `--exclude` |  | exclude file path regex |
| `--json` | `false` | print structured JSON output |
| `-h`, `--help` | `false` | show help |

### Notes

- The output path must be different from the entry path.
- If no CLI arguments are given, the command falls back to interactive prompts.

## Programmatic Use

The package default export is the same runner used by the CLI:

```javascript
const cryptoRun = require('crypto-image-name');

cryptoRun({
	entry: './dist',
	output: './dist-crypto',
	privateKey: 'mkt',
	excludePattern: 'keep\\.png$'
});
```
