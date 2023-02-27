import axios from './axios'

//获取菜单
export const getMenu = (param) =>{
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param
  })
}
//获取首页数据
export const getData = () => {
  return axios.request({
    url: '/home/getData'
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
export const editUser = (param) => {
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data: param
  })
}
