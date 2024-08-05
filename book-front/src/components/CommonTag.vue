<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name!=='home'"
      :effect="route.name === tag.name ?'dark': 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag,index)"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useAllDataStore} from '@/stores/index'
const store = useAllDataStore()
const route = useRoute()
const router = useRouter()
const tags = computed(()=>store.state.tags)

const handleMenu = (tag)=>{
  router.push(tag.name)
  store.selectMenu(tag)
}
const handleClose = (tag,index)=>{
  store.updateTags(tag)
  //如果不是当前页面直接关闭
  if(tag.name !== route.name) return
  if(index === store.state.tags.length){ 
    store.selectMenu(tags.value[index-1])
    router.push(tags.value[index-1].name)
  }else{
    store.selectMenu(tags.value[index])
    router.push(tags.value[index].name)
  }
}
</script>

<style scoped lang='less'>
.tags{
    margin:20px 0 0 20px;
}
.el-tag{
    margin-right:10px;
}
</style>