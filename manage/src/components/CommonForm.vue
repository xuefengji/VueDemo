<template>
  <el-form ref="form"
           label-width="100px"
           :model="formData"
           :rules="rules"
           status-icon
           :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input
        v-if="item.type === 'input'||item.type === 'password'"
        :placeholder="'请输入'+item.label"
        v-model="formData[item.model]"
      ></el-input>
      <el-switch
          v-if="item.type === 'switch'" v-model="formData[item.model]"></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="formData[item.model]"
      ></el-date-picker>
      <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="formData[item.model]"
      >
        <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CommonForm',
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean
  },
  data () {
    return {
      formData: this.form,
      rules: [

      ]
    }
  },
  watch: {
    form: function (newVal) {
      this.formData = newVal
    }
  },
  // computed: {
  //    formData () {
  //      return this.form
  //    }
  // }
}
</script>