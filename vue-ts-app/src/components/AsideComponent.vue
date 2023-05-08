<template>
  <el-menu default-active="1" router>
    <el-sub-menu v-for="item in menus"
                 :key='item.path'
                 :index="item.path">
      <template #title>
        <el-icon><component :is="item.meta?.icon"></component></el-icon>
        <span>{{item.meta?.title}}</span>
      </template>
      <el-menu-item v-for="itemChild in item.children"
                    :key="item.path + itemChild.path"
                    :index="item.path + itemChild.path">
        <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
        <span>{{ itemChild.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import _ from 'lodash'

const router = useRouter()
const  menus = _.cloneDeep(router.options.routes).filter((v) => {
  return v.meta?.menu;
})


</script>

<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - 60px);
  border: none;
  padding-top: 30px;
}
.el-menu-item.is-active {
  border-right: 3px solid #1890ff ;
  background: #e6f7ff;
}
</style>