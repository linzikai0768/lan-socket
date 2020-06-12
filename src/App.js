import React from 'react'
import './assets/css/App.css'
import Header from './pages/header/header'
import Main from './pages/main/main'
import Aside from './pages/aside/aside'
import io from 'socket.io-client'
import userCode from './utils/userCode'
import ChangeName from './components/changeName'
import { getUserForm, getChannelList, getAllMessage } from './api/axios'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dialog: false,
      userList: [],
      channelList: [],
      channelId: 0
    }
  }
  componentDidMount () {
    const socket = io('http://localhost:3030')
    socket.emit('userAccess', JSON.stringify({ userCode }))
    socket.on('informUserAccess', data => {
      console.log(data)
    })
    socket.on('changeName', data => {
      console.log(data)
    })
    this.getUserList()
    this.getChannelList()
  }
  getUserList = () => {
    getUserForm().then(res => {
      this.setState({ userList: res.data })
      res.data.find(item => {
        if (item.userCode === userCode) {
          if (!item.userName) this.setState({ dialog: true })
        }
        return item.userCode === userCode
      })
    })
  }
  getChannelList = () => {
    getChannelList({ userCode }).then(res => {
      let channeIds = []
      let channelList = res.data.map(item => {
        channeIds.push(item.channelId)
        item.member = JSON.parse(item.member)
        return item
      })
      this.setState({ channelList })
      this.getAllMessage(channeIds)
    })
  }
  getAllMessage = ids => {
    getAllMessage({ ids }).then(res => {
      console.log(res)
    })
  }
  isOpenDialog = state => {
    this.setState({
      dialog: state
    })
  }
  render () {
    let { channelList, dialog, channelId } = this.state
    return (
      <div className='App'>
        <Header openDialog={this.isOpenDialog}></Header>
        <div className='middle'>
          <Aside channelList={channelList} channelId={channelId}></Aside>
          <Main></Main>
        </div>
        <ChangeName dialog={dialog} openDialog={this.isOpenDialog}></ChangeName>
      </div>
    )
  }
}

export default App
