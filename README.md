# translation-maker

[![appveyor-image]][appveyor-url] [![deployment]][deployment-url] [![license-image]][license-url]

[appveyor-image]: https://img.shields.io/appveyor/ci/kongying-tavern/translation-maker.svg?style=flat&logo=appveyor&logoColor=FFFFFF&label=main
[appveyor-url]: https://ci.appveyor.com/project/kongying-tavern/translation-maker

[deployment]: https://github.com/kongying-tavern/translation-maker/actions/workflows/deployment.yml/badge.svg?branch=main
[deployment-url]: https://github.com/kongying-tavern/translation-maker/actions/workflows/deployment.yml

[license-image]: https://img.shields.io/github/license/kongying-tavern/translation-maker?style=flat
[license-url]: https://github.com/kongying-tavern/translation-maker

## 准备工作
**部分内容已过时, 请以最新构建配置文件为准(deployment.yml/appveyor.yml).**
1. 安装 `nodejs >= 8`
2. 命令行切入当前目录，输入 `npm i` 安装依赖
3. 如果上述命令下载过慢，可进行如下操作：
    1. 先运行 `npm install cnpm -g --registry=https://registry.nlark.com`
    2. 再删除 `node_modules` 目录
    3. 运行 `cnpm i` 安装依赖

## 运行脚本

1. 运行 `npm run gen`，此命令会生成各语言的语言包和整体配置 `manifest.json`，并打包成 `.zip` 文件

Excel2json is written by [@boxsnake](https://github.com/boxsnake "boxsnake")


