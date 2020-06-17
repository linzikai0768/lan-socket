import axios from 'axios'
import href from '../utils/href'
let instance = axios.create({
  baseURL: href,
  withCredentials: false
})
// 获取用户列表
export function getUserForm () {
  return instance({
    url: '/acquire/userName/list'
  })
}
// 修改用户名称
export function changeName (data) {
  return instance({
    url: '/change/userName',
    method: 'post',
    data
  })
}

// 获取自己所在的群
export function getChannelList (data) {
  return instance({
    url: '/acquire/channel',
    method: 'post',
    data
  })
}
// 获取所在群的所有信息
export function getAllMessage (data) {
  return instance({
    url: '/acquire/allMessage',
    method: 'post',
    data
  })
}
// 创建群
export function addChannel (data) {
  return instance({
    url: '/addChannel',
    method: 'post',
    data
  })
}
// 加入群
export function joinChannel (data) {
  return instance({
    url: '/joinChannel',
    method: 'post',
    data
  })
}
// 上传图片消息
export function sendImgMessage (data) {
  return instance({
    url: '/send/imgMessage',
    method: 'post',
    data,
    responseType: 'text'
  })
}
