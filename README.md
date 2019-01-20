# react-framework
Project development framework (React)

### 使用说明
```sh
1、npm install // 下载依赖包
2、npm run dll // 处理公共依赖，可按需修改第三方依赖
3、npm run dev // 开发环境使用
4、npm run build // 打包文件到dist目录
```
### 辅助指令
```sh
npm run zip 打包dist下代码到release.zip
```
>注意： 
>
>1、执行 npm run dev/build 之前必须要先执行npm run dll指令
>
>2、使用HMR方式监控代码，修改index.html和src/static下静态被复制的文件无法实现热更新

