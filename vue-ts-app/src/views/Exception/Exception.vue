<template>
  <div class="exception-title">
    <el-button type="primary" @click="handleToApply">异常处理</el-button>
    <el-space>
      <el-button plain>{{year}}年</el-button>
      <el-select v-model="month">
        <el-option v-for="item in 12" :key="item" :value="item" :label="item + '月'" />
      </el-select>
    </el-space>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if='detailData.length === 0' description="暂无异常考勤"></el-empty>
      <el-timeline v-else>
        <el-timeline-item v-for="item in detailData" :key='item[0]' :timestamp="year+'/'+month +'/'+ item[0]" placement="top">
          <el-card>
            <el-space>
              <h4>{{item[1]}}</h4>
              <p>考勤详情：{{ renderTime(item[0]) }}</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if='applyDetailMonth.length ===0' description="暂无申请审批"></el-empty>
      <el-timeline v-else>
        <el-timeline-item v-for="item in applyDetailMonth" :key="item._id" :timestamp="item.reason" placement="top">
          <el-card>
            <h4>{{item.state}}</h4>
            <p class="apply-info">申请日期 {{item.time[0]}} - {{item.time[1]}}</p>
            <p class="apply-info">申请详情 {{item.note}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import {useStore} from "@/store";
import {toZero} from "@/utils/common";

const store = useStore()
const singInfos = computed(() => store.state.signs.infos)
const route = useRoute()
const router = useRouter()
const date = new Date()
const year = date.getFullYear()
const month = ref(Number(route.query.month) ||date.getMonth()+1)
const applyDetailMonth = computed(()=>store.state.checks.applyList.filter((v)=>{
  const startTime = (v.time as string[])[0].split(' ')[0].split('-');
  const endTime = (v.time as string[])[1].split(' ')[0].split('-');
  return startTime[1] <= toZero(month.value) && endTime[1] >= toZero(month.value)
}))


const ret = (singInfos.value.detail as {[index: string]: unknown})[toZero(month.value)] as {[index: string]: unknown}
const detailData = computed(() => Object.entries(ret).filter((v) => v[1]!== '正常考勤').sort())
const renderTime = (date: string) => {
  const ret = ((singInfos.value.time as {[index: string]: unknown})[toZero(month.value)] as {[index: string]: unknown})[date]
  if (Array.isArray(ret)){
    return ret.join('-')
  } else {
    return '暂无打卡记录'
  }
}

watch(month, ()=>{
  router.push({
    query: {month: month.value}
  })
})

const handleToApply = () => {
  router.push('/apply')
}
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