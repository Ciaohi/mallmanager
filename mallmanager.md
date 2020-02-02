# mallmanager项目相关


## 重点
1. src/
2. build/ webpack相关代码
3. config/ 本地服务器配置
4. .eslintignore eslist排除文件
5. .eslinttrc eslint配置文件
#### 02-项目-准备-代码规范-自定义命令-lintfix
1. 结尾有;
2. if(a===b){}
3. 不允许出现未使用的变量
4. 不允许出现一个以上空行

> 在package.json中scripts自定义指令：指令很长
> npm run 自定义指令名(dev)
> npm run lintfix(自动按照规范修正全部的js代码,多余变量不修正)
> 自动打开浏览器dev:'xxxxx --open'
> 关闭eslint build/webpack.base.conf.js 注释掉42行

#### 03-项目-准备-element-ui-文档分析

> element-ui 饿了么开发团队
> 适用于vue-pc
> 在main.js 引入

#### 04-项目-准备-element-ui-安装-引入

> npm i elment-ui -S
> 在main.js import
> Vue.use(ElementUI)

#### 05-项目-准备-项目模板化-调整
> 删除模板中我们用不到的文件/代码

#### 06-项目-准备-git 版本控制
> git/svn
1. git init -> .git
2. git status
3. git add .
4. git commit -m "zhushi"
5. 在代码托管平台(github)新建远程仓库
6. git push
