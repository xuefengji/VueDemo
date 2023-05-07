<template>
  <div>
    <el-container>
      <el-header><header-component></header-component></el-header>
      <el-container>
        <el-aside><aside-component></aside-component></el-aside>
        <el-main>
          <bread-crumb-component></bread-crumb-component>
          <main-component></main-component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import AsideComponent from "@/components/AsideComponent.vue"
import MainComponent from "@/components/MainComponent.vue";
import BreadCrumbComponent from "@/components/BreadCrumbComponent.vue";


</script>

<style scoped lang="scss">
.el-header {
  box-shadow: 0 8px 24px -2px rgba(0,0,0,.05);
}
.el-aside {
  box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}
.el-main {
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
</style>