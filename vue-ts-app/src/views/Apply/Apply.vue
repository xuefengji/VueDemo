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
  <div class="apply-table">
    <el-table border :data='applyPageData' style="width: 100%">
      <el-table-column prop="applicantname" label="申请人" width="180"> </el-table-column>
      <el-table-column prop="reason" label="审批事由" width="180"> </el-table-column>
      <el-table-column prop="time" label="时间" >
        <template #default="scope">
          {{scope.row.time.join('-')}}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" width="180"> </el-table-column>
      <el-table-column prop="approvername" label="审批人" width="180"> </el-table-column>
      <el-table-column prop="state" label="状态" width="180"> </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   v-model:currentPage="currentPage"
                   :page-sizes="[5, 10, 20, 30]"
                   :page-size="currentPageSize"
                   layout="sizes, prev, pager, next"
                   :total="applyData.length">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import { useStore } from '@/store'


const store = useStore()
const applyData = store.state.checks.applyList

const currentPageSize = ref(5)
const currentPage = ref(1)
const applyPageData = computed(()=> applyData.slice((currentPage.value-1) * currentPageSize.value, currentPage.value* currentPageSize.value))

const handleSizeChange = (val: number)=>{
  currentPageSize.value = val
}
const handleCurrentChange = (val: number)=>{
  currentPage.value = val
}

const approverType = ref('全部')
</script>

<style scoped lang="scss">
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table {
  margin: 10px;
  .el-pagination {
    margin: 10px;
    display: flex;
    float: right;
  }
}
</style>