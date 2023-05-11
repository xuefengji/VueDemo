<template>
  <el-descriptions border direction="vertical" column="9">
    <el-descriptions-item label="月份">10月</el-descriptions-item>
    <el-descriptions-item label="考勤管理">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">0</el-descriptions-item>
    <el-descriptions-item label="Telephone">
      <el-button type="primary" size="small" plain>查看详情</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="Telephone">
      <el-tag type="danger" size="small">异常</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.el-descriptions {
  margin: 10px;
}
</style>