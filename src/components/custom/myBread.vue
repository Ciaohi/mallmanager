<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  data () {
    return {
      /* level1: "",
      level2: "" */
    }
  },
  // props 值字符串数组
  // props中的值的用法和data数据数据用法一样
  // props中的数据的值 来源于使用组件时 传的值
  // props的数据也是该组件的属性 <child-a :msg="abc">
  props: ['level1', 'level2']
}
</script>

<style>

</style>
