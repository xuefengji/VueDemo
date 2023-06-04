<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在线考勤系统</span>
    <el-dropdown>
      <el-badge :is-dot="isDot">
        <el-icon size="20"><Bell /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleNavigate('/apply')" v-if="newsInfo.applicant">有审批结果消息</el-dropdown-item>
          <el-dropdown-item @click="handleNavigate('/check')" v-if="newsInfo.approver">有审批请求消息</el-dropdown-item>
          <el-dropdown-item v-if="!newsInfo.applicant && !newsInfo.approver">暂无消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space  class="home-header-badge">
        <el-avatar
            :src="head"
        />{{ name }}
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from '@/store'
import {useRouter} from "vue-router";


const router = useRouter()
const store = useStore();
const head = computed(() => store.state.users.infos.head)
const name = computed(() => store.state.users.infos.name)
const newsInfo = computed(() => store.state.news.info)
const isDot = computed(() => (newsInfo.value.applicant || newsInfo.value.approver) as boolean)
const handleLogOut = () => {
  store.commit('users/clearToken')
  setTimeout(() => {
    window.location.replace('/login')
  }, 500)
}
const handleNavigate = (path: string)=>{
  router.push(path);
}
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