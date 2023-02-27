import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import getUser from './mockServeData/user'


Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)
Mock.mock('/user/getUserList', 'get', getUser.getUserList)


