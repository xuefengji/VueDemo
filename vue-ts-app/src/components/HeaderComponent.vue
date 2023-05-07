<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在线考勤系统</span>
    <el-dropdown>
      <el-badge>
        <el-icon size="20"><Bell /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>暂无消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space  class="home-header-badge">
        <el-avatar
            src="http://api.h5ke.top/uploads/62632f3f674b1e20c841aae2.png"
        />黄蓉
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
    font-size: 18px;
    margin-right: auto;
  }
  .home-header-badge {
    margin-left: 20px;
  }
}
</style>