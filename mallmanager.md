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

#### 20-项目-首页-进入首页的权限验证

> 如果没有登录过 就不能进入到home组件
```js
    // newVue之前自动触发
    beforeCreate () {
      // 获取token
      const token = localStorage.getItem('token')
      if (!token) {
        // token 没有 > 登录
        this.$router.push({name: 'login'})
      }
      // if token 有 > 继续渲染组件
    } 
```

#### 21-项目-首页-头部-推出功能
```js
handleSignout (){
      // 1.清除token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到Login组件
      this.$router.push({name: 'login'})
    }
```
#### 22-项目-提交
1. 切到master
2. git merge dev-login 合并分支
3. push
4. 新建dev-users

#### 23-项目-用户管理-用户列表-新建组件-路由配置

1. home.vue开启了路由模式 index值 ->path值
2. home.vue main-> router-view
3. 新建users.vue
4. router/index.js 在home中children配置users的路由

### day-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框
1. el-card 卡片小容器
2. 面包屑
3. el-row>el-col>el-input+el-button
4. 调整样式

#### 02-项目-用户管理-用户列表-引入表格组件
> el-table(data数据源[]) > el-table-column(label表头/prop="数据") > 字符串数据
```html
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
```
#### 03-项目-用户管理-用户列表-表头处理

> 按照效果 调整了表头的数量和Label
> type=""index" ->该列的每个单元格的内容从1开始的序号

#### 04-项目-用户管理-用户列表-请求数据-设置请求头
1. created(){this.getUserList()}
2. methods:{getUserlist(){发送请求}}
3. 接口文档中 除了登录之外的所有请求都需要进行授权->设置请求头
4. 找axios中关于请求头设置的代码
```js
 this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
```
5. 发送请求


#### 05-项目-用户管理-用户列表-渲染数据-一般数据
1. 结构赋值 给this.userlist = res.data.data.users
2. prop="""
   username
   email
   mobile
   create_time
   mg_state
   
#### 06-项目-有用户管理-用户列表-渲染数据-日期格式处理
1. main.js 全局过滤器 fmdata
2.1 prop="create_time { fmtdate"  不行!
2.2 单元格的内容只能显示文本
```html
  <el-table-column>
    prop="create_time"
    label="创建时间">
    {{create_time | fmtdate}}        
</el-table-column>
```
2.3 需要给该内容外层加容器template
> 不同组件的数据不是共享的 独立作用域
```html
 <el-table-column>
    prop="create_time"
    label="创建时间">
    <templte>
       {{create_time | fmtdate}}
    </templte>
</el-table-column>
```

2.4 最终写法
> slot-scope 作用： 传值
> slot-scope的值会自动去上一级找外层标签el-table所绑定的数据userlist
> slot-scope="scope" 此时 “scope”==uselist数组
> scope.row是数组的每个对象
> scope.row.create_time要用的数据
```html
 <el-table-column>
    label="创建时间">
    <templte slot-scope="scope">
       {{scope.row.create_time | fmtdate}}
    </templte>
</el-table-column>
```
#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关
> el-switch v-model="bool"
```html
 <el-table-column
        label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
      </el-table-column>
```
#### 08-项目-用户管理-用户列表-渲染数据-操作
> 操作里面不是字符串
1. template容器 slot-scope="scoe"
2. el-button
> size="mini" plain

#### 09-项目-用户管理-用户列表-分页组件-文档-引入
> 该接口支持分页 url参数中有pagenum pagesize
1. @size-change  每页显示变化时触发
2. @current-change 当前页改变时触发
3. current-page 设置当前页是第几页
4. page-sizes=[2,4,6,8] 每页多少条的数据数组
5. page-size 设置显示多少条
6. total数据总数

#### 10-项目-用户管理-用户列表-分页组件-配置数据

1. current-page="pagenum"
2. page-size=2
3. total="total"

#### 11-项目-用户管理-用户列表-分页组件-分页请求

1. 每页显示条数改变 -> this.pagesize=val ->this.getUserList()
2. 页码改变时 -> this.pagenum = val -> this.getUserList()

> 希望当每页条数改变时 从第一页开始显示this.pagenum=1 -> currentPage=1

#### 12-项目-项目管理-用户列表-搜索用户
1. 给搜索输入框绑定query v-model="query"
2. 点击搜索按钮 发送请求
3. 一建清除 clearable
4. 点击清除按钮 -> 重新获取数据
```html
 <el-input @clear="loadUserList()" clearable
         placeholder="请输入内容"
         v-model="query"
         class="inputSearch">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
```

#### 13-项目-用户管理-用户列表-添加用户-显示对话框
1. 引入对话框 > el-form
2. 点击添加用户的按钮 ->显示对话框 this.dialogFormVisibleADD = true
3. 配置对话框
3.1 :model=form:{看接口文档添加用户时用哪个数据}
3.2 dialogFormVisibleADD:flase
3.3 el-form>el-input v-model="form.xxx

#### 14-项目-用户管理-用户列表-添加用户-发送请求
1. post this.form
2. 关闭对话框
3. 清空文本框this.form ={}
4. 更新视图
5. 提示框
> post status === 201


#### 16-项目-用户管理-用户列表-删除用户-打开确认框
> this.$config().then().catch()
1. 点击确定 -> .then的参数
2. 点击取消 -> .catch的参数

#### 17-项目-用户管理-用户列表-删除用户-处理响应
1. 点击确定 -> 发送delete请求
1.1 提示
1.2 更新数据
1.3 回到第一页
> 注意async的位置
```js
this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求 :id -----> 用户id
        // 1. data中userId X
        // 2. 把userId以参数形式传递进来

        const res = await this.$http.delete(`users/${userId}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.pagenum = 1
          // 更新视图
          this.getUserList()
          // 提示
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
```
#### 18-项目-用户管理-用户列表-编辑用户-显示对话框
> 点击操作中的编辑按钮 打开编辑对话框
0. 提供该对话框显示/隐藏控制属性
1. 找到编辑按钮@click
2. 打开对话框
3. 把之前添加对话框进行赋值 - 修改
> form用的是之前添加用户时的form

#### 20-扩展-git的使用

1. gitbash ->指令操作
2. gitGUI ->图形页面 ->一个能操作git的软件
#### day-09-重点
#### 01-项目-用户管理-用户列表-编辑用户-发送请求
1. 点击edit编辑按钮 scope.roe
2. 在showEditUserDia方法中 this.form=user user其实是scope.row
> 用户名 禁用

#### 02-项目-用户管理-用户列表-编辑用户-发送请求

1. 找到对话框的确定按钮 -> editUser() -> 发送请求
> this.form =user
> id -> this.form.id
> 先点编辑 再点添加 -> 打开添加对话框之前 this.form={}

#### 03-项目-用户管理-用户列表-修改用户状态

1. 找到开关 @change="changeMgState(scope.row)"
2. changeMgState(){发送put请求}
> users/:uId/state/:type uid用户id


#### 04-项目-用户管理-用户列表-分配角色-功能演示
1. 点击按钮 -> 打开对话框
2. 对话框 中有下拉框
3. 修改当前用户的角色
4. 5个角色名来源于请求
> 每个角色的权限是不同的

#### 05-项目-用户管理-用户列表-分配角色-显示对话框
1. 点击操作中的按钮 -> 打开对话框
2. 引入对话框(有下拉框)
> 下拉框的特性： 如果select绑定的数据的值和option的value值一样 此时显示的是该option的label值
3. 把option分成了两类 请选择(-1)和v-for遍历option
4. data提供了el-select的v-model所绑定的数据currRoleId =-1

#### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
> el-select和el-option
1. 当改变label时 -> 该label显示 -> 改变了value -> el-select v-model绑定的数据 自动关联->

#### 07-项目-用户管理-用户列表-分配角色-显示当前用户角色
1. 通过请求获取所有角色 roles
2. v-for el-option :label="item.roleName" :value="item.id"
3. 通过请求获取当前用户的role_id
4. 给el-select 中v-model绑定的数据赋值 this.currRoleId =res.data.data.role_id
> rid接口文档的参数名是role_id

#### 08-项目-用户管理-用户列表-分配角色-修改用户角色
1. 通过视图操作->修改了label->value值变化->el-select v-model绑定的数据变化
2. currrRoleId

> 在setRole 方法中要使用用户id  在data声明currUserId:-1
3. 在showSetUserRoleDia(){this.currUserId=user.id}

```js
async setRole () {
      // users/:id/role
      // :id 要修改的用户的id值
      // 请求体中rid修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId,
        curs: this.currState
      })
      console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRol = false
    },
```
#### 09-项目-用户管理-用户列表-合并分支-推送

1. git add .
2. git commit -m "注释"
3. git branch
4. git checkout master
5. git merge dev-users
6. git push

#### 10-项目-权限管理-权限列表-新建组件-路由配置
1. 权限管理
1.1 角色列表
> 展开行+树形结构
>1.2 权限列表

#### 10-项目-权限管理-权限列表-新建组件-路由配置
1. 新建right.vue
2. home.vue改标识
3. 配置路由

#### 11-项目-权限管理-权限列表-自定义面包屑组件
> 好多组件都有面包->二次封装了面包屑组件
1. 新建.vue文件
2. 在自定义组件中提供数据 level1 llevel2 -> props:[]
3.main.js 引入
4. Vue.component(MyBread.name,MyBread)

#### 12-项目-权限管理-权限列表-获取权限列表数据
> 除了登录之外的所有请求 都需要设置头部信息
> typd参数 值list或者tree

#### 13-项目-权限管理-权限列表-axios-拦截器-设置请求头

> 除了登录之外的所有请求 都需要设置头部信息
> 在请求发起之前要添加头部
> 请求拦截器 config.header
> 响应拦截器 (目前没使用)


#### 14-项目-权限列表-表格展示
> 引入el-table 绑定数据 rightlist(authName path level)

#### 15-项目-权限管理-权限列表-表格展示-层级显示
> Level==='0' 一级
1. template slot-scope="scope"
2. v-if ="scope.row.level"==='0'" 一级

#### 16-项目-权限管理-权限列表-表格展示-固定表头

>给el-table设置固定高
> overflow:auto

#### 17-项目-权限管理-角色列表-新建组件-配置路由
1. 新建role.vue组件
2. 配置路由

#### 18-项目-权限管理-角色列表-面包屑和添加按钮
 
1. 自定义面包屑
2. 添加按钮 
 
#### 19-项目-权限管理-角色列表-获取角色列表数据

1. 发送请求 this.$http.get(`roles`)

#### 20-项目-权限管理-角色列表-表格展示
> 将users.vue中的表格进行复制 修改
1. :data="rolelist"
2. roleName
3. roleDesc
4. 操作

#### 21-项目-权限管理-角色列表-表格展示-展开功能分析
1. type="expand"
2. template > 该角色的权限(三级)
3. 页面布局如果是行列问题 -> for循环 -> v-for el-tag

#### 22-项目-权限管理-角色列表-表格展示-展开行-一级权限
1. 分析数据rolelist > 每个对象中的children中zuthName
2. 布局 一行>(列A>(el-tag)+列B>(一行el-row>两列(el-colA)el-tag+e1-colB>el-tag))
3. 一级权限展示 v-for 最外层的el-row scope.row.children

### day-10-重点

#### 01-项目-权限管理-角色列表-表格展示-展开行-二级权限

> 在第一列(一级权限)的基础上: 展示二级权限
```html
 <el-row v-for="(item2,i) in item1.children" :key="i">
                  <el-col :span="4">
                    <el-tag>{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20"></el-col>
                </el-row>
``` 
#### 02-项目-权限管理-角色列表-表格展示-展开行-三级权限

> 在二级权限展示完毕基础上
> v-for遍历的是item2.children el-tag

### 03-项目-权限管理-角色列表-表格展示-展开行-三级权限

1. el-tag颜色 type="success"
2. closeable
3. <i class=""></i> 图标

#### 04-项目-权限管理-角色列表-表格展示-展开行-处理无权限的提示
> 角色无权限时 提示
> <span v-if ="scope.row.children.length===0">未分配权限</span>

#### 05-项目-权限管理-角色列表-表格展示-展开行-取消权限

> 点击x按钮 取消该角色的权限
1. el-tag @close="deleRight(scope.row.id,item.id)"
2. deleRight(roleId,rightId){发送请求}
3. this.$http.delete(`roles/${roleId}/rights/${rightId}`)
4. 更新整个视图
> 删除成功 返回了该角色的剩余权限

#### 06-项目-权限管理-角色列表-表格展示-展开行-取消权限-优化

>删除成功->更新整个表格_>没必要
>删除成功 返回了该角色的剩余权限 
>删除成功 -> 更新了当前角色的children

#### 07-项目-权限管理-角色列表-表格展示-修改权限-显示对话框
> 点击操作的check按钮 -> 打开对话框
1. 提供对话框
2. check按钮 @click="showSetRightDia(scope.row)"

#### 08-项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析
>el-tree
```js
树形结构
      data->数据源[]
          show-checkbox -> 选择框
          node-key 每个节点的唯一标识 通常是data数据源中key名id
          default-expanded-keys 默认展开 [要展开的节点的id]
          default-checked-keys [要选择的节点的id]
          props 配置项 {label,children}
          lable节点的文字标题和chiledren节点的子节点
          值都来源于data绑定的数据源中的该数据的key名 'Label' 和'children'
```

#### 09-项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据
1. data中treelist
2  打开对话框时 获取树形结构的权限列表数据
> const res=await this.$htt.get(`rights.tree`)
> this.treelist = res.data.data
3. el-tree :data="treelist"
4. el-tree node-key="id"
5.:props={label:`authName`,children:`children`}
>默认展开和选中
#### 10-项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项
> el-tree default-expand-all
> default-expanded-keys = [所有权限的id] for嵌套

#### 11-项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有权限
> el-tree default-checked-key="[]"
1. data arrcheck
2. role for嵌套 获取最里层叶子节点id 
3. this.arrcheck = arrtemp2

> 只给最里层

#### 12-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-功能分析
1. 点击对话框确定 发送请求
> roleId rid
2. roldId 在打开对话框的方法中 this.roleId=role.id
3.
3.1 获取全选的节点id数组 getCheckedKeys
3.2 获取半选的节点id数组 getHalfCheckedkeys
4. 在js中调用el-tree的js方法
4.1 给el-tree设置ref
4.2 this.$refs.ref的值tree.js方法(3.1和3.2的方法名)
4.3 返回两个数组arr1和arr2
5. ES6 张开运算符
> let arr = [...arr1,...arr2]
6. this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr})
7. 关闭对话框+更新视图

#### 14-项目-首页-侧边栏-动态导航
>get(`menus`)获取导航的所有数据
1. order
2. path标识
3. children
4. v-for
> 在写之后的路由配置时 path不能随便写
#### 15-项目-效果演示-不同角色用户登录-显示对应权限
> 每个角色有不同的权限
1. 新建用户 分配角色
2. 回到登录页 登录新用户 ->token
3. 渲染home组件的侧边栏时 使用header中的token
4. 发送getMenus() 也会使用header

#### 16-项目-不同角色用户登录-显示对应权限-导航守卫
1. 在home.vue中判断token很麻烦
2. 导航守卫
2,1 路由配置生效前 先来到路由守卫的cb
2.2 to 要去的路由配置 from当前的路由配置
2.3 next() 让to的路由配置继续生效

```js
router.beforeEach((to, from, next) => {
  // to from next
  // console.log(to, from)
  // 如果要去的是登录 -> next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录
    // 判断token
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果token没有 -> login
      // 提示
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    // 如果有 -> next()
    next()
  }
})
```
#### 17-项目-权限管理-合并分支-推送-新建分支
1. git status
2. git add .
3. git commit -m ""
4. git checkout master
5. git branch
6. git status
7. git push
#### 18-项目-商品管理-功能演示
1. 商品列表-添加商品
2. 分类参数
2.1 动态参数
2.2 静态参数
