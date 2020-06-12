import React from 'react'
import './header.css'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClick = open => {
    this.setState({ open })
  }
  render () {
    return (
      <div className='header'>
        <div>Logo</div>
        <div className='rigth'>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={() => this.handleClick(true)}
          >
            Open Menu
          </Button>
          <Menu
            id='simple-menu'
            keepMounted
            open={this.state.open}
            onClose={() => this.handleClick(false)}
          >
            <MenuItem onClick={() => this.props.openDialog(true)}>
              修改昵称
            </MenuItem>
          </Menu>
        </div>
      </div>
    )
  }
}

export default Header
