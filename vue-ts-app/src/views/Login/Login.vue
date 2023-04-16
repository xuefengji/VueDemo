<template>
  <div>
    hello login
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/axios'
http.post('/users/login', {
  "emial": "huangrong@imooc.com",
  "pass": "huangrong"
}).then((res)=>{
  console.log(res.data)
})
</script>

<style scoped lang="scss"></style>