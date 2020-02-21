<template>
  <el-card>
    <!--面包屑-->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addroleb">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="rolelist"
      style="width: 100%">
      <el-table-column
        type="expand"
        width="150">
        <template slot-scope="scope">
            <el-row v-for="(item1,i) in scope.row.children" :key="i">
              <el-col :span="4">
                <!--传角色id和权限id-->
                <el-tag @close="deleRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2,i) in item1.children" :key="i">
                  <el-col :span="4">
                    <el-tag @close="deleRight(scope.row,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag  @close="deleRight(scope.row,item3.id)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">
                      {{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
           <!--无权限的提示-->
          <span v-if ="scope.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="150">
      </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200">
      </el-table-column>

      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit" circle
            @click="showEditUserDia(scope.row)">

          </el-button>
          <el-button size="mini"
                     plain
                     type="danger"
                     icon="el-icon-delete" circle
                     @click="showDeleUserMsgBox(scope.row.id)" ></el-button>
          <el-button
            @click="showSetRightDia(scope.row)"
            size="mini"
            plain type="success"
            icon="el-icon-check" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改权限的对话框-->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!--
      树形结构
      data->数据源[]
      show-checkbox -> 选择框
      node-key 每个节点的唯一标识 通常是data数据源中key名id
      default-expanded-keys 默认展开 [要展开的节点的id]
      default-checked-keys [要选择的节点的id]
      props 配置项 {label,children}
      lable节点的文字标题和chiledren节点的子节点
      值都来源于data绑定的数据源中的该数据的key名 'Label' 和'children'
      -->
      <el-tree
      ref="tree"
      :data="treelist"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="arrcheck"
      :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      // 树形结构的数据
      treelist: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      arrexpand: [],
      arrcheck: [],
      currRoleId: -1
    }
  },
  created () {
    this.getRolelist()
  },
  methods: {
    // 修改权限 -发送请求
    async setRoleRight () {
      // roleId 当前要修改权限的角色id
      // 获取全选的id的数组arr1 getcheckedKeys()
      let arr1 = this.$refs.tree.getCheckedKeys()
      console.log(arr1)
      // 获取半选的id的数据arr2 getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(arr2)

      // ES6 展开运算符 ...数组或者对象
      let arr = [...arr1, ...arr2]
      // console.log(arr)
      // el-tree -> js方法getCheckedKeys
      // 1. 给要操作的dom元素 是指ref属性值 input ref="txt"
      // 2. this.$refs.ref属性值.js方法名() this.$refs.txt.foucs()

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,
        {rids: arr})
      console.log(res)
      // 更新视图
      this.getRolelist()
      // 关闭对话框
      this.dialogFormVisibleRight = false
    },
    // 修改/分配 权限 - 打开对话框
    async showSetRightDia (role) {
      console.log(role)
      // 给currRoleId赋值
      this.currRoleId = role.id
      // 获取树形结构的权限数据
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.treelist = res.data.data

      /* var arrtemp1 = []
      this.treelist.forEach(item1 => {
        arrtemp1.push(item1.id)
        item1.children.forEach(item2 => {
          arrtemp1.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp1.push(item3.id)
          })
        })
      }) */
      /* console.log(arrtemp1)
      this.arrexpand = arrtemp1 */
      // 获取当前角色role 的权限id
      let arrtemp2 = []
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      console.log(arrtemp2)
      this.arrcheck = arrtemp2

      this.dialogFormVisibleRight = true
    },
    // 取消权限
    async deleRight (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      // 删除成功 返回了200和该角色的剩余权限、
      role.children = res.data.data.children
      // this.getRolelist()
    },
    async getRolelist () {
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.rolelist = res.data.data
      // console.log(this.rolelist)
    }
  }
}
</script>

<style>
.addroleb{
  margin-top: 20px;
}
</style>
