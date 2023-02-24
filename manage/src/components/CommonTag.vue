<template>
  <div class="tags">
    <el-tag size="small"
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name? 'dark':'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
    >
      {{tag.label}}
    </el-tag>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  methods:{
    changeMenu (tag) {
      this.$router.push({name: tag.name})
    },
    handleClose () {

    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabList
    })
  }
}
</script>

<style lang="less" scoped>

.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}

</style>