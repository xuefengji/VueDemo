export default {
  state: {
    isCollapse: false,
    tabList: [{
      path: '/',
      name: 'home',
      label: '首页',
      url: 'Home/Home',
      icon: 's-home',
    }],
    currentMenu: null
  },
  mutations: {
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    selectList(state, val){
      if (val.name !== 'home'){
        state.currentMenu = val
        const index = state.tabList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabList.push(val)
        } else {
          state.currentMenu = null
        }
      }
    },
    closeTag(state, val){
      const result = state.tabList.findIndex(item=>item.name===val.name)
      state.tabList.splice(result,1)
    }
  }
}