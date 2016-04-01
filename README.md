#vue+webpack
首先把项目克隆到本地
运行安装命令，安装依赖的包
```
npm install
```
安装完毕之后就输入启动项目
```
webpack-dev-server --inline --hot
```
进入server目录，克隆另一个项目下来(This is a NodeJS API that supports username and password authentication with JWTs and has APIs that return Chuck Norris phrases)
```
git clone https://github.com/auth0/nodejs-jwt-authentication-sample.git
```
进入此项目并运行
```
node server.js
```
地址栏输入localhost:8080，就会看到内容了

此项目除了使用了nodejs-jwt-authentication的接口外，还使用了获取儿童心理辅导文章列表和详情接口，还有日乎日报接口，浏览器跨域的情况下，News和zhihu这两个页面才有内容。

可作为vue+webpack开发的脚手架