import userCode from '../utils/userCode'
const defaultState = {
  userName: 'userName',
  messageList: [],
  userList: [],
  channelList: [],
  channelId: 0
}
// state参数起始存放的是原始数据
// action参数是由store传递进来的数据变更，它其实是一个对象
let reducer = (state = defaultState, action) => {
  if (action.type === 'save_userList') {
    const oNewState = JSON.parse(JSON.stringify(state))
    oNewState.userList = action.value
    action.value.find(item => {
      if (item.userCode === userCode) oNewState.userName = item.userName
      return item.userCode === userCode
    })
    return oNewState
  }
  if (action.type === 'save_channelList') {
    const oNewState = JSON.parse(JSON.stringify(state))
    oNewState.channelList = action.value
    return oNewState
  }
  if (action.type === 'save_messageList') {
    const oNewState = JSON.parse(JSON.stringify(state))
    oNewState.messageList = action.value
    return oNewState
  }
  if (action.type === 'change_channel') {
    const oNewState = JSON.parse(JSON.stringify(state))
    oNewState.channelId = action.value
    return oNewState
  }
  if (action.type === 'add_message') {
    const oNewState = JSON.parse(JSON.stringify(state))
    oNewState.messageList.push(action.value)
    return oNewState
  }
  return state
}

export default reducer
