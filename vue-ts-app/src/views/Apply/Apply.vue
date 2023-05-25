<template>
  <div class="apply-title">
    <el-button type="primary">添加审批</el-button>
    <el-space>
      <el-input placeholder="请输入搜索关键词"/>
      <el-button type="primary" icon="search" >搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部" />
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const approverType = ref('全部')
</script>

<style scoped lang="scss">
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
</style>