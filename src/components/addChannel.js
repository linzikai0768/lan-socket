import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { addChannel } from '../api/axios'
import userCode from '../utils/userCode'
class AddChannel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      channelName: '',
      open: false,
      message: ''
    }
  }
  fnAddChange = () => {
    let channelName = this.state.channelName.trim()
    if (channelName) {
      addChannel({ creator: userCode, channelName }).then(res => {
        if (res.data.code === 200) {
          this.handleClose(true, res.data.msg)
          this.props.getChannelList()
          this.props.openDialog(false)
          this.props.changeChannel(this.props.channelList.length)
        } else {
          this.handleClose(true, res.data.msg)
        }
      })
    } else this.handleClose(true, '群名称不能为空')
  }
  fnChange = e => {
    this.setState({
      channelName: e.target.value
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
            <DialogTitle id='alert-dialog-title'>{'创建群'}</DialogTitle>
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
              <Button color='primary' autoFocus onClick={this.fnAddChange}>
                创建
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}
export default AddChannel
