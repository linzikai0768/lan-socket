import React from 'react'
import './assets/css/App.css'
import Header from './pages/header/header'
import Main from './pages/main/main'
import Aside from './pages/aside/aside'
import userCode from './utils/userCode'
import ChangeName from './components/changeName'
import { getUserForm, getChannelList, getAllMessage } from './api/axios'
import { connect } from 'react-redux'
import socket from './utils/socket'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dialog: false,
      coercive: false
    }
  }

  componentDidMount () {
    socket.emit('userAccess', JSON.stringify({ userCode }))
    socket.emit('informUserAccess', data => {
      console.log(data)
    })
    socket.on('changeName', data => {
      this.isOpenDialog(true, true)
      this.getChannelList()
    })
    this.getUserList()
    this.getChannelList()
  }
  getUserList = () => {
    getUserForm().then(res => {
      this.props.saveUserList(res.data)
      res.data.find(item => {
        if (item.userCode === userCode) {
          if (!item.userName) this.isOpenDialog(true, true)
        }
        return item.userCode === userCode
      })
    })
  }
  getChannelList = () => {
    getChannelList({ userCode }).then(res => {
      if (!res.data.length) return
      let channeIds = []
      let channelList = res.data.map(item => {
        channeIds.push(item.channelId)
        item.member = item.member.split(',')
        return item
      })
      this.props.saveChannelList(channelList)
      this.getAllMessage(channeIds)
    })
  }
  // 获取所有群信息
  getAllMessage = ids => {
    getAllMessage({ ids }).then(res => this.props.saveMessageList(res.data))
  }
  isOpenDialog = (dialog, coercive) => this.setState({ dialog, coercive })
  render () {
    let { dialog, coercive } = this.state
    let { channelList } = this.props
    return (
      <div className='App'>
        <Header isOpenDialog={this.isOpenDialog}></Header>
        <div className='middle'>
          <Aside
            channelList={channelList}
            getChannelList={this.getChannelList}
          ></Aside>
          <Main></Main>
        </div>
        <ChangeName
          dialog={dialog}
          isOpenDialog={this.isOpenDialog}
          coercive={coercive}
          getUserList={this.getUserList}
        ></ChangeName>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return {
    saveUserList (data) {
      dispatch({
        type: 'save_userList',
        value: data
      })
    },
    saveChannelList (data) {
      dispatch({
        type: 'save_channelList',
        value: data
      })
    },
    saveMessageList (data) {
      dispatch({
        type: 'save_messageList',
        value: data
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
