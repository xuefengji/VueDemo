<template>
  <div class="apply-title">
    <el-button type="primary" @click="handleOpen">添加审批</el-button>
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
  <el-dialog
      v-model="dialogVisible"
      title="添加审批"
      width="500px"
  >
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="main"
    >
      <el-form-item label="审批人" prop="approvername">
        <el-select v-model="ruleForm.approvername">
          <el-option v-for="item in approvorList" :key="item._id"  :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批事由" prop="reason">
        <el-select v-model="ruleForm.reason">
          <el-option value="年假"></el-option>
          <el-option value="事假"></el-option>
          <el-option value="病假"></el-option>
          <el-option value="外出"></el-option>
          <el-option value="补签卡"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="textarea" type="textarea" rows="5"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetData(ruleFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import { useStore } from '@/store'
import {DateModelType, ElMessage, FormInstance, FormRules} from "element-plus";
import router from "@/router";


const textarea = ref('')
const ruleFormRef = ref<FormInstance>()
interface Apply{
  applicantid: string,
  approvername: string,
  approverid: string,
  reason: string,
  note: string,
  time: [DateModelType, DateModelType]

}

const resetData = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const ruleForm = reactive<Apply>({
  applicantid: '',
  approvername: '',
  approverid: '',
  reason: '',
  note: '',
  time: ['', '']
})

const rules = reactive<FormRules>({
  approvername: [
    { required: true, message: '请选择审批人', trigger: 'blur' },
  ],
  reason: [
    { required: true, message: '请选择审批事由', trigger: 'blur' },
  ],
  note: [
    { required: true, message: '请填写备注', trigger: 'blur'}
  ],
  time: [
    { required: true, message: '请选择时间', trigger: 'blur'}
  ],
})

const handleOpen = () => {
  dialogVisible.value = true
}
const dialogVisible = ref(false)

const store = useStore()
const userInfos = computed(()=>store.state.users.infos)
const approvorList = computed(()=>userInfos.value.approver as {[index: string]: unknown}[])
const applyData = computed(() => store.state.checks.applyList.filter((v) => (v.state === approverType.value || approverDefaultType === approverType.value) && (v.note as string).includes(searchText.value)))

const currentPageSize = ref(5)
const currentPage = ref(1)
const applyPageData = computed(()=> applyData.value.slice((currentPage.value-1) * currentPageSize.value, currentPage.value* currentPageSize.value))

const handleSizeChange = (val: number)=>{
  currentPageSize.value = val
}
const handleCurrentChange = (val: number)=>{
  currentPage.value = val
}
const approverDefaultType = '全部'
const approverType = ref(approverDefaultType)
const searchText = ref('')
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