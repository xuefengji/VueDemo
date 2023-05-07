<template>
  <el-breadcrumb separator="/" class="home-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
    ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.home-breadcrumb {
  background: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
</style>