import React from 'react'
import './main.css'
import { connect } from 'react-redux'
import socket from '../../utils/socket'
import userCode from '../../utils/userCode'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import dayjs from 'dayjs'
import href from '../../utils/href'
import { sendImgMessage } from '../../api/axios'
class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.myFile = React.createRef()
    this.myDiv = React.createRef()
  }
  componentDidMount () {
    socket.on('sendMessage', data => {
      this.props.addMessage(data)

      this.myDiv.current.scrollTop = this.myDiv.current.scrollHeight
    })
    socket.on('sendImgMessage', data => {
      this.props.addMessage(data)
      this.myDiv.current.scrollTop = this.myDiv.current.scrollHeight
      let i = 0
      setInterval(() => {
        i++
        if (i < 10) {
          this.myDiv.current.scrollTop = this.myDiv.current.scrollHeight
        }
      }, 10)
    })
  }
  getMessageList () {
    let messageList = []
    let channel = this.props.channelList[this.props.channelId]
    if (!channel) {
      return messageList
    }
    this.props.messageList.forEach(item => {
      if (item.channelId - 0 === channel.channelId) {
        messageList.push(item)
      }
    })
    return messageList
  }
  fnChange = e => this.setState({ message: e.target.value })
  send = e => {
    e.preventDefault()
    if (this.state.message === '') return
    let { userName, channelList, channelId } = this.props
    channelId = channelList[channelId].channelId
    socket.emit('sendMessage', {
      channelId,
      message: this.state.message,
      userCode,
      userName
    })
    this.setState({ message: '' })
  }
  sendImg = () => {}
  fnShow = () => {
    if (window.innerWidth > 560) return
    if (this.props.show) this.props.changeShow()
  }
  upImg = () => {
    let file = this.myFile.current.files[0]
    if (!file) return
    let { userName, channelList, channelId } = this.props
    channelId = channelList[channelId].channelId
    let fd = new FormData()
    fd.append('imgMessage', file)
    fd.append('channelId', channelId)
    fd.append('userCode', userCode)
    fd.append('userName', userName)
    sendImgMessage(fd).then(data => {
      if (data.data.code === 200) this.myFile.current.value = ''
    })
  }
  render () {
    let messageList = this.getMessageList()

    return (
      <div className='main' onClick={this.fnShow}>
        <div className='input'>
          <TextField
            id='outlined-multiline-static'
            label='Message'
            multiline
            rows={8}
            value={this.state.message}
            variant='outlined'
            onChange={this.fnChange}
            className='message'
          />
          <Button
            variant='contained'
            size='small'
            onClick={this.send}
            className='send'
          >
            发送
          </Button>
          <div className='file'>
            <i className='img'>
              <input
                type='file'
                accept='image/*'
                onChange={this.upImg}
                ref={this.myFile}
              />
            </i>
          </div>
        </div>

        <div className='message-list' ref={this.myDiv}>
          {messageList.map(item => {
            return (
              <div
                key={item.time}
                className={
                  item.userCode === userCode ? 'content oneself' : 'content'
                }
              >
                <div className='userImg'>{item.userName}</div>
                <div className='primary'>
                  <div className='time'>
                    {dayjs(item.time).format('YYYY/M/D H:m:s')}
                  </div>
                  {item.message ? (
                    <div
                      className='text'
                      dangerouslySetInnerHTML={{
                        __html: item.message.replace(/(\r\n|\n|\r)/gm, '<br />')
                      }}
                    />
                  ) : (
                    <div className='text'>
                      <img alt='' src={href + item.imgMessage} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return {
    addMessage (data) {
      dispatch({
        type: 'add_message',
        value: data
      })
    },
    changeShow () {
      dispatch({ type: 'change_show' })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
