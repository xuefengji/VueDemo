import axios from './axios'

//获取菜单
export const getMenu = (data) =>{
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data
  })
}
//获取首页数据
export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

//新增用户
export const addUser = (param) => {
  return axios.request({
    url: '/user/add',
    method: 'post',
    data: param
  })
}
//编辑用户
export const editUser = (data) => {
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

//获取用户
export const getUserList = (param) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    param
  })
}

//删除用户
