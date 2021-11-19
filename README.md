# crypto image name

> crypto image name in folder

## install

``` bash
$ npm install -g crypto-image-name
```

## useage

### bash

``` bash
  command: cryptoimage

  argv:
    entryPath     entry folder path (default: './dist')
    outputPath    output folder path (default: './dist_crypto')
    secretKey     secretKey for crypto (default: 'kyungtae')
```

#### example

``` bash
$ cryptoimage
```

``` bash
$ cryptoimage ./dist ./dist-test 
```

``` bash
$ cryptoimage ./dist ./dist-test testkey 
```

### webpack plugin

```javascript
// webpack.config.js
const cryptoImageName = require('crypto-image-name');

plugins:[
	new cryptoImageName()
]
```

#### options
| Name |   Default |
| ----- | ----- |
| entryPath | './dist' |
| outputPath | './dist_crypto' | 
| secretKey | 'kyungtae' |

