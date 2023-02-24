<template>
  <div id="main">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <CommonTag></CommonTag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside"
import CommonHeader from "@/components/CommonHeader"
import CommonTag from "@/components/CommonTag"

export default {
  name: 'MainIndex',
  components: {
    CommonHeader,
    CommonAside,
    CommonTag
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}

</style>