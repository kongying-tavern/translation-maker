# translation-maker

[![appveyor-image]][appveyor-url] [![GitHub-image]][github-url] [![license-image]][license-url]

[appveyor-image]: https://img.shields.io/appveyor/ci/peaceshi/translation-maker.svg?style=flat&logo=appveyor&logoColor=FFFFFF&label=master
[appveyor-url]: https://ci.appveyor.com/project/peaceshi/translation-maker

[github-image]: https://img.shields.io/github/v/release/peaceshi/translation-maker?style=flat
[github-url]: https://github.com/peaceshi/translation-maker/releases/latest

[license-image]: https://img.shields.io/github/license/peaceshi/translation-maker?style=flat
[license-url]: https://github.com/peaceshi/translation-maker

## 准备工作

1. 安装 `nodejs >= 8`
2. 命令行切入当前目录，输入 `npm i` 安装依赖
3. 如果上述命令下载过慢，可进行如下操作：
    1. 先运行 `npm install cnpm -g --registry=https://registry.nlark.com`
    2. 再删除 `node_modules` 目录
    3. 运行 `cnpm i` 安装依赖

## 运行脚本

1. 运行 `npm run gen`，此命令会生成各语言的语言包和整体配置 `manifest.json`，并打包成 `.zip` 文件

Excel2json is written by [@boxsnake](https://github.com/boxsnake "boxsnake")
