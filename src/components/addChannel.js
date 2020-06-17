import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { addChannel, joinChannel } from '../api/axios'
import userCode from '../utils/userCode'
import { connect } from 'react-redux'
class AddChannel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      channelName: '',
      open: false,
      message: ''
    }
  }
  fnChange = e => this.setState({ channelName: e.target.value })
  fnExecute = () => {
    let channelName = this.state.channelName.trim()
    if (channelName) {
      if (this.props.isAdd) {
        this.fnAddChange(channelName)
      } else {
        this.fnJoinChannel(channelName)
      }
    } else this.handleClose(true, '群名称不能为空')
  }
  fnAddChange = channelName => {
    addChannel({ creator: userCode, channelName }).then(res => {
      if (res.data.code === 200) {
        this.handleClose(true, res.data.msg)
        this.props.openDialog(false)
        this.props.addJoinChannel(
          {
            creator: userCode,
            channelName,
            channelId: res.data.channelId
          },
          this.props.channelList.length
        )
      } else this.handleClose(true, res.data.msg)
    })
  }
  fnJoinChannel = channelName => {
    joinChannel({ userCode, channelName }).then(res => {
      if (res.data.code === 200) {
        this.handleClose(true, res.data.msg)
        this.props.openDialog(false)
        this.props.addJoinChannel(res.data.data, this.props.channelList.length)
      } else {
        this.handleClose(true, res.data.msg)
      }
    })
  }
  handleClose = (open, message) => this.setState({ open, message })
  render () {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          onClose={() => this.handleClose(false)}
          message={this.state.message}
          key={'top-center'}
          autoHideDuration={3000}
          className='Snackbar'
        />
        <Dialog
          open={this.props.dialog}
          onClose={() => this.props.openDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <form autocomplete='off'>
            <DialogTitle id='alert-dialog-title'>
              {this.props.isAdd ? '创建群' : '加入群'}
            </DialogTitle>
            <DialogContent>
              <TextField
                id='standard-basic'
                label='channelName'
                className='inputName'
                onChange={this.fnChange}
                value={this.state.channelName}
                severity='success'
              />
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                onClick={() => this.props.openDialog(false)}
              >
                取消
              </Button>
              <Button color='primary' autoFocus onClick={this.fnExecute}>
                {this.props.isAdd ? '创建' : '加入'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return {
    addJoinChannel (data, index) {
      dispatch({
        type: 'addJoin_channel',
        value: data,
        index
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddChannel)
