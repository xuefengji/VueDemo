<template>
  <el-breadcrumb separator="/" class="home-breadcrumb">
    <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.path">{{item.meta?.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import {computed} from "vue";

const route = useRoute();
const breadcrumbs = computed(() => route.matched)

</script>

<style scoped lang="scss">
.home-breadcrumb {
  background: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
</style>