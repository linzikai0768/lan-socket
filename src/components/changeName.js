import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { changeName } from '../api/axios'
import userCode from '../utils/userCode'
class ChangeNameDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      open: false,
      message: ''
    }
  }
  fnChangeName = () => {
    let userName = this.state.userName.trim()
    console.log(userName)

    if (userName) {
      changeName({ userCode, userName }).then(res => {
        if (res.data === '修改成功') {
          this.handleClose(true, res.data)
          this.props.openDialog(false)
        } else {
          this.handleClose(true, res.data)
        }
      })
    } else {
      this.handleClose(true, '昵称不能为空')
    }
  }
  fnChange = e => {
    this.setState({
      userName: e.target.value
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
          // onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'修改昵称'}</DialogTitle>
          <DialogContent>
            <TextField
              id='standard-basic'
              label='userName'
              className='inputName'
              onChange={this.fnChange}
              value={this.state.userName}
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
            <Button color='primary' autoFocus onClick={this.fnChangeName}>
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default ChangeNameDialog
