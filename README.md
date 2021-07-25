# 「空荧酒馆」原神地图 翻译生成工具

[![appveyor-image]][appveyor-url] [![GitHub-image]][github-url] [![license-image]][license-url]

[appveyor-image]: https://img.shields.io/appveyor/ci/peaceshi/translation-maker.svg?style=flat&logo=appveyor&logoColor=FFFFFF&label=master
[appveyor-url]: https://ci.appveyor.com/project/peaceshi/translation-maker

[github-image]: https://img.shields.io/github/v/release/peaceshi/translation-maker?style=flat
[github-url]: https://github.com/peaceshi/translation-maker/releases/latest

[license-image]: https://img.shields.io/github/license/peaceshi/translation-maker?style=flat
[license-url]: https://github.com/peaceshi/translation-maker

## Excel转JSON - Excel2json

### 准备工作

1. 安装 `nodejs >= 8`
2. 命令行切入当前目录，输入 `npm i` 安装依赖
3. 如果上述命令下载过慢，可进行如下操作：
    1. 先运行 `npm install cnpm -g --registry=https://registry.nlark.com`
    2. 再删除 `node_modules` 目录
    3. 运行 `cnpm i` 安装依赖

### 运行脚本

1. 运行 `npm run gen`，此命令会生成各语言的语言包和整体配置 `manifest.json`，并打包成 `.zip` 文件

Excel2json is written by [@boxsnake][github-boxsnake]

[github-boxsnake]: https://github.com/boxsnake "Boxsnake"

## Bash脚本：自动下载翻译文件

### 使用方法

1. 将 `tools/down-translation.sh` 下载到 Linux / MacOSX 系统上
2. 运行脚本前，请确保以下命令行存在：
    1. `wget`
    2. `unzip`
3. 以下环境变量，可在运行脚本时指定，也可事先声明：
    1. `TRM_TMP_ZIP` - 下载的临时 zip 文件的路径
    2. `TRM_TARGET_DIR` - 目标目录
4. 运行 `./down-translation.sh`
