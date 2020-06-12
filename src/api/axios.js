import axios from 'axios'
import Qs from 'qs'
let instance = axios.create({
  baseURL: 'http://localhost:3030/'
})
// 获取用户列表
export function getUserForm () {
  return instance({
    url: 'acquire/userName/list'
  })
}
// 修改用户名称
export function changeName (data) {
  return instance({
    url: 'change/userName',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取自己所在的群
export function getChannelList (data) {
  return instance({
    url: 'acquire/channel',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取所在群的所有信息
export function getAllMessage (data) {
  return instance({
    url: 'acquire/allMessage',
    method: 'post',
    data: Qs.stringify(data)
  })
}
