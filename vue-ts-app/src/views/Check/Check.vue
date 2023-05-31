<template>
  <div class="check-title">
    <el-space>
      <el-input placeholder="请输入搜索关键词" v-model="searchText"/>
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
  <div class="check-table">
    <el-table border :data="checkPageData" style="width: 100%">
      <el-table-column prop="applicantname" label="申请人" width="180"> </el-table-column>
      <el-table-column prop="reason" label="审批事由" width="180"> </el-table-column>
      <el-table-column prop="time" label="时间" >
        <template #default="scope">
          {{scope.row.time.join('-')}}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" width="180"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="handlePutApply(scope.row._id, '已通过')" type="success" icon="check" size="small" circle></el-button>
          <el-button @click="handlePutApply(scope.row._id, '未通过')" type="danger" icon="close" size="small" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180"> </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   v-model:currentPage="currentPage"
                   :page-sizes="[5, 10, 20, 30]"
                   :page-size="currentPageSize"
                   layout="sizes, prev, pager, next"
                   :total="checkList.length">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { useStore } from '@/store'
import {ElMessage} from "element-plus";

const store = useStore()
const searchText = ref('')
const approverDefaultType = '全部'
const approverType = ref(approverDefaultType)
const currentPageSize = ref(5)
const currentPage = ref(1)

const usersInfos = computed(()=>store.state.users.infos)
const checkList = computed(()=>store.state.checks.checkList.filter((v) => (v.state === approverType.value || approverDefaultType === approverType.value) && (v.note as string).includes(searchText.value)))
const checkPageData = computed(()=> checkList.value.slice((currentPage.value-1) * currentPageSize.value, currentPage.value* currentPageSize.value))

const handlePutApply = (_id: string, state: '已通过' | '未通过') => {
  store.dispatch('checks/putApply',{_id, state}).then((res)=>{
    if (res.data.errcode === 0) {
      store.dispatch('checks/getApplyList', {approverid: usersInfos.value._id}).then((res) => {
        if (res.data.errcode === 0){
          store.commit('checks/updateCheckList', res.data.rets)
        }
      })
      ElMessage.success('审批成功')
    }
  })
}
const handleSizeChange = (val: number)=>{
  currentPageSize.value = val
}
const handleCurrentChange = (val: number)=>{
  currentPage.value = val
}
</script>

<style scoped lang="scss">
.check-title {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.check-table {
  margin: 10px;
  .el-pagination {
    margin: 10px;
    display: flex;
    float: right;
  }
}
</style>