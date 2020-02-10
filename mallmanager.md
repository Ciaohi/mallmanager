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
6. git remote add origin git@github.com:Ciaohi/mallmanager.git
7. git push -u origin master(之后再push 直接git push)

#### 07-项目-登录-新建分支-login 组件-配置路由
> 新建一个分支 专门写登录功能
> git branch
> git checkout -b dev-login
> 新建组件+配置路由
> 注意： 
1. commit每完成一个小功能就commit一次
2. push操作master去完成

#### 08-项目-登录-引入表单主件

> el-form
1. 引入
2. 调整标签(h2+el-button)
> label-position="top"

#### 09-项目-登录-样式调整
> height:100%
> 注意: div#app height:100%

#### 10-项目-登录-axios 插件
> axios不是Vue插件- Vue.use(axios)

```js

// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer

```
> 在main.js中导入之后Vue.use(插件名)
> 结果: this.$http.get()

#### 11-项目-登录-发送登录请求
> Login.vue methods handleLogin()
1. this.$http.post('login',this.formdata).then((res)=>{})
2. 对象结构赋值 res.data

```js
const {data,msg,status} = res.data
        if (status === 200) {
          // 登录成功
          // 1.跳转home首页
          this.$router.push({name: 'home'})
        }
```

#### 12-项目-登录-引入提示框组件
> this.$message.waring(msg)

#### 13-项目-登录-登录成功-进入home组件
> 登录成功 -> 来到home组件
1. js编程式导航this.$router.push({name:'home'})
2. App.vue router-view
3. 新建home组件
4. 路由index.js配置路由

#### 14-项目-登录-简化登录请求代码-async和await
> 让异步代码ajax看起来像同步代码
1. 找到异部操作有结果的代码 前面加await 同时接口异步操作的结果res
2. 找到距离异部操作有结果的代码最近的方法 前面家async
```js
async handleLogin (){
      const res = await this.$http.post('login', this.formdata)
      /* console.log(res) */
      const {msg, status} = res.data
      if (status === 200) {
        // 登录成功
        // 1.跳转home首页
        this.$router.push({name: 'home'})
        // 2.提示成功
        this.$message.success(msg)
      } else {
        // 不成功
        //  1. 提示消息
        this.$message.warning(msg)
      }
    }
```
#### 15-项目-登录-保存 token 值

> 目的:如果哟过户没登录->url直接来到home组件
> 在登录成功时 保存正确用户的token
```js
 localStorage.setItem('token',data.token)
```

#### 16-项目-首页-布局容器-使用-样式调整
> 引入布局容器
#### 17-项目-首页-头部-样式调整
> Layout布局
> 行el-row
> 列el-coL
> 注意24栏

#### 18-项目-首页-侧边栏-导航组件-文档
> el-menu
1. router 开启路由模式 true index==path值
2. unique-opened是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整

> 调整el-menu
> index值不能一样
