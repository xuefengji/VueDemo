<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在线考勤系统</span>
    <el-dropdown>
      <el-icon size="20"><Bell /></el-icon>
    </el-dropdown>
    <el-badge>
      <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </el-badge>
  </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  font-size: 34px;
  align-items: center;
  height: 100%;
  .home-header-logo{
    .icon-vue, .icon-icon-test, .icon-typescript{
      margin-right: 5px;
      font-size: inherit;
    }
    .icon-vue{
      color: green;
    }
    .icon-icon-test{
      color: #deb887
    }
    .icon-typescript{
      color: blue
    }
  }
  .home-header-title{
    margin-left: 30px;
    font-weight: 700;
    font-size: 30px;
  }
}
</style>