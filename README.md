# crypto image name

> Change the image name inside the entry folder using crypto hash. <br>
> When changing the image name, the image path written in the files(css, js, html, txt, vue, jsx) inside the folder is also changed.

## use as cli

#### install

``` bash
$ npm install -g crypto-image-name
```

#### use
``` bash
$ cryptoimage
```

<br>

## use as webpack plugin

#### install
``` bash
$ npm install -D crypto-image-name
```

#### use
```javascript
// webpack.config.js
const cryptoImageName = require('crypto-image-name');

plugins:[
	new cryptoImageName()
]
```

#### options

| Name |  Default | description |
| ----- | ----- | ----- |
| entryPath | './dist' | |
| outputPath | './dist-crypto' | | 
| privateKey | 'mkt' | |
| exclude |  | exclude pattern(regx) |

