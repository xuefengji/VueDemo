<template>
  <div class="exception-title">
    <el-button type="primary">异常处理</el-button>
    <el-space>
      <el-button plain>{{year}}年</el-button>
      <el-select v-model="month">
        <el-option v-for="item in 12" :key="item" :value="item" :label="item + '月'" />
      </el-select>
    </el-space>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if='false' description="暂无异常考勤"></el-empty>
      <el-timeline v-else>
        <el-timeline-item timestamp="2023/5/21" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023/5/21" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if='false' description="暂无申请审批"></el-empty>
      <el-timeline v-else>
        <el-timeline-item timestamp="事假" placement="top">
          <el-card>
            <h4>已通过</h4>
            <p class="apply-info">申请日期 2023-05-10 12:00:00 - 2023-05-11 12:00:00</p>
            <p class="apply-info">申请详情 1</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023/5/21" placement="top">
          <el-card>
            <h4>已通过</h4>
            <p class="apply-info">申请日期 2023-05-10 12:00:00 - 2023-05-11 12:00:00</p>
            <p class="apply-info">申请详情 1</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {ref} from "vue";

const date = new Date()
const year = date.getFullYear()
const month = ref(date.getMonth()+1)
</script>

<style scoped lang="scss">
.exception-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.el-select {
  width: 90px;
}
.el-timeline {
  margin: 10px;
}
.apply-info {
  margin: 10px;
}
</style>