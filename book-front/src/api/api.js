import request from "./request"

export default {
    // 请求首页左侧的表格数据
    getTableData(){
        return request({
            url: '/api/home/getTableData',
            method: 'get'
        })
    },
    getCountData(){
        return request({
            url: '/api/home/getCountData',
            method: 'get'
        })
    },
    getChartData(){
        return request({
            url: '/api/home/getChartData',
            method: 'get'
        })
    },
    getUserData(data){
        return request({
            url: '/api/home/getUserData',
            method: 'get',
            data,
        })
    },
    deleteUser(data){
        return request({
            url: '/api/user/deleteUser',
            method: 'get',
            data,
        })
    },
    addUser(data){
        return request({
            url: '/api/user/addUser',
            method: 'post',
            data,
        })
    },
    editUser(data) {
        return request({
          url: '/user/editUser',
          method: 'post',
          data,
        })
      },
}