# crypto image name

> crypto hash 를 이용하여 entry 폴더 내부에 있는 이미지 이름을 변경 합니다.<br>
> 이미지 이름을 변경할때 폴더 내부에 있는 파일(css, js, html, txt, vue, jsx)에 작성된 이미지 경로를 같이 변경합니다.

## 명령어로 사용하기 

### 설치
``` bash
$ npm install -g crypto-image-name
```

### bash
``` bash
  command: cryptoimage

  argv:
    entryPath     entry folder path (default: './dist')
    outputPath    output folder path (default: './dist-crypto')
    secretKey     secretKey for crypto (default: 'mkt')
```

### 예제
#### 기본값으로 사용
``` bash
$ cryptoimage
```
#### 경로 지정
``` bash
$ cryptoimage ./dist ./dist-test 
```
#### 경로와 시크릿 키 지정
``` bash
$ cryptoimage ./dist ./dist-test testkey 
```

## webpack plugin 으로 사용하기 
``` bash
$ npm install -D crypto-image-name
```

```javascript
// webpack.config.js
const cryptoImageName = require('crypto-image-name');

plugins:[
	new cryptoImageName()
]
```

### options
| Name |   Default |
| ----- | ----- |
| entryPath | './dist' |
| outputPath | './dist-crypto' | 
| secretKey | 'mkt' |

