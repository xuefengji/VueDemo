<template>
  <el-descriptions border direction="vertical" column=9>
    <el-descriptions-item label="月份">{{month}}月</el-descriptions-item>
    <el-descriptions-item v-for="(value, key) in DailyKey"
                          :key="key"
                          :label="value">
      {{detailValue[key]}}
    </el-descriptions-item>
    <el-descriptions-item label="Telephone">
      <el-button type="primary" size="small" plain>查看详情</el-button>
    </el-descriptions-item>
    <el-descriptions-item label="Telephone">
      <el-tag type="danger" size="small">异常</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  <el-calendar v-model="date">
    <template #header>
      <el-button type="primary" plain>在线签到</el-button>
      <el-space>
        <el-button plain>{{year}}年</el-button>
        <el-select v-model="month"  @change="handleChange">
          <el-option v-for="item in 12" :key="item" :value="item" :label="item + '月'" />
        </el-select>
      </el-space>
    </template>
  </el-calendar>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";

const date = ref(new Date())
const year = date.value.getFullYear()
const month = ref(date.value.getMonth() + 1)
enum DailyKey {
  normal = '正常考勤',
  absent = '旷工',
  miss = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退'
}

const detailValue = reactive({
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  early: 0,
  lateAndEarly: 0,
})
const handleChange = () => {
  date.value = new Date(`${year}.${month.value}`)
}
</script>

<style scoped lang="scss">
.el-descriptions {
  margin: 10px;
}
.el-select {
  width: 90px;
}
</style>