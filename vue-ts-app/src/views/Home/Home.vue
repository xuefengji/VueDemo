<template>
  <div>
    <el-container>
      <el-header><header-component></header-component></el-header>
      <el-container>
        <el-aside><aside-component></aside-component></el-aside>
        <el-main><main-component></main-component></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import AsideComponent from "@/components/AsideComponent.vue"
import MainComponent from "@/components/MainComponent.vue";


</script>

<style scoped lang="scss"></style>