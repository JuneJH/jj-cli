# jj-cli脚手架

> 提高团队协作利器，规范团队流程

## 1. 背景

1. 团队开发可能不止存在一个项目，每一个新项目的开始就是人工复制已有代码全靠人力，每个人对业务和逻辑的理解不一定是一致的，必然会导致各种各样的代码
2. 每开启一个新的项目就是打开新的一种开发模式，像潘多拉盒一样无穷无尽

## 2. 需求

1. 提供一个自动化创建一样模板的工具
2. 能够有效维护已有的技术沉淀，能持续迭代这部分，也能更新升级已有版本
3. 能够简便追加资源库

## 3. 技术实现

1. 利用nodejs实现一个脚手架，通过命令行方式
2. 利用commandjs实现收集指令
3. 利用inquirer实现命令交互
4. 利用nodejs多进程提高性能
5. 利用缓存提高性能
6. 利用lerna进行包管理包发布
