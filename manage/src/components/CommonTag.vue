<template>
  <div class="tags">
    <el-tag size="small"
            v-for="(tag, index) in tags"
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
import { mapState, mapMutations } from 'vuex'
export default {
  methods:{
    changeMenu (tag) {
      this.$router.push({name: tag.name})
    },
    handleClose (tag, index) {
      const length = this.tags.length - 1
      // this.close(tag)
      this.$store.commit("closeTag",tag)
      if (tag.name !== this.$route.name){
        return;
      }
      if (length === index){
        this.$router.push({name: this.tags[index-1].name})
      } else {
        this.$router.push({name: this.tags[index].name})
      }
    }
  },
  computed:{
    ...mapMutations({
      close: 'closeTag'
    }),
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