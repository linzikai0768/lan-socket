import React from 'react'
import './header.css'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClick = open => this.setState({ open })
  render () {
    let { userName } = this.props
    return (
      <div className='header'>
        <div>Logo</div>
        <div className='rigth'>
          <div onClick={() => this.handleClick(true)}> {userName} </div>
          <Menu
            open={this.state.open}
            onClose={() => this.handleClick(false)}
            // anchorEl={anchorEl}
          >
            <MenuItem onClick={() => this.props.isOpenDialog(true, false)}>
              修改昵称
            </MenuItem>
            <MenuItem>My account</MenuItem>
          </Menu>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { ...state }
}
export default connect(mapStateToProps)(Header)
