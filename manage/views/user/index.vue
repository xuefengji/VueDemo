<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
      @open="onDialogOpen"
    >
      <common-form
        :formLabel="opreateFormLabel"
        :form="opreateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="add">+ 新增</el-button>
      <common-form
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table
        :table-data="tableData"
        :table-label="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="userEdit"
        @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable";
import {addUser, editUser, getUserList } from "../../api/data";

export default {
  name: 'UserPage',
  components:{
    CommonForm,
    CommonTable
  },
  data () {
    return {
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        },
      ],
      operateType: 'add',
      isShow: false,
      opreateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      opreateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        },
      ],
      searchForm: {
        keyword: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList (name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUserList({
        page: this.config.page,
        name
      }).then(({data: res}) => {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })

    },
    delUser (row) {
      this.$confirm("此操作将永久删除该用户，是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id()
        this.$http.post("/user/del", {
          params: { id }
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        })
        this.getList()
      })
    },
    onDialogOpen(){
      if(this.operateType === 'add'){
        this.restOpreateForm()
      }
    },
    userEdit (row) {
      // console.log(row)
      this.operateType = 'edit'
      this.isShow = true
      this.opreateForm = row
      // console.log(this.opreateForm)
    },
    confirm() {
      if (this.operateType === 'edit') {
        editUser(this.opreateForm).then(() => {
          this.isShow = false
          this.getList()
        })
      } else {
        addUser(this.opreateForm).then(() => {
          // console.log(res)
          this.isShow = false
          this.getList()
        })
      }
  },
    restOpreateForm(){
      this.opreateForm = {
        name: '',
        addr: '',
        age: '',
        brith: '',
        sex: ''
      }
    },
    add(){
      this.isShow = true
      this.operateType = 'add'
      // this.restOpreateForm()
    },
}
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
</style>