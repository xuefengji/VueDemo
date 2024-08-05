<template>
 <div>商品管理</div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const dialogVisible = ref(false)
const action = ref('add')
const formUser = reactive({
  sex: "1",
})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})

const tableLable = reactive([
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'sexLabel',
    label: '性别'
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 200
  },
  {
    prop: 'addr',
    label: '地址',
    width: 400
  }
])
const handleDelete = (val) => {
  ElMessageBox.confirm('确定要删除吗？').then(async () => {
    await proxy.$api.deleteUser({ id: val.id })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getUserData()
  })
}
const tableData = ref([])
const config = reactive({
  name: '',
  total: 0,
  page: 1
})
const formInline = reactive({
  keyWord: ''
})
const getUserData = async () => {
  let data = await proxy.$api.getUserData(config)
  console.log(data)
  tableData.value = data.list.map((item) => ({
    ...item,
    sexLabel: item.sex === 1 ? '男' : '女'
  }))
  config.total = data.count
}
const handleChange = (page) => {
  config.page = page
  getUserData()
}
const handleSearch = () => {
  config.name = formInline.keyWord
  getUserData()
}
const handleClose =()=>{
  dialogVisible.value = false
}
const handleCancel = ()=>{
  dialogVisible.value = false
}

const addUser = ()=>{
  dialogVisible.value = true
  action.value = 'add'
}

const editUser = (val)=>{
  dialogVisible.value = true
  action.value = 'edit'
  nextTick(()=>{
    Object.assign(formUser,{...val,sex:''+val.sex})
  })
}
//格式化日期，格式化为：1997-01-02这种
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
}
const onSubmit = ()=>{
  proxy.$refs['userForm'].validate(async (valid)=>{
    if(valid){
      let res = null
      formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth)
      if(action.value==="add"){
        res = await proxy.$api.addUser(formUser);
      }else if(action.value === 'edit'){
        res = await proxy.$api.editUser(formUser);
      }
      if(res){
        dialogVisible.value = false
        proxy.$refs['userForm'].resetFields()
        getUserData()
      }
    }else{
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: 'error'
      })
    }
  })
}

onMounted(() => {
  getUserData()
})
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table {
    width: 100%;
    height: 500px;
  }
  
}
.select-clearn{
    display: flex;
  }
</style>
