import React from 'react'
import './aside.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AddChannel from '../../components/addChannel'
import { connect } from 'react-redux'
class Aside extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dialog: false
    }
  }
  changeChannel = i => {
    if (i === this.props.channelId) return
    this.props.changeChannel(i)
  }
  openDialog = dialog => this.setState({ dialog })
  render () {
    let { channelList, channelId } = this.props
    return (
      <div className='aside'>
        <div className='tool'>
          <Button
            variant='contained'
            color='primary'
            href='#contained-buttons'
            onClick={() => this.openDialog(true)}
          >
            创建群
          </Button>
          <Button variant='contained' color='primary' href='#contained-buttons'>
            加入群
          </Button>
        </div>
        <Divider />
        <List component='nav' aria-label='main mailbox folders'>
          {channelList.map((item, index) => (
            <ListItem
              button
              key={item.channelId}
              onClick={() => this.changeChannel(index)}
            >
              <ListItemText
                primary={item.channelName}
                className={channelId === index ? 'color' : ''}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <AddChannel
          dialog={this.state.dialog}
          openDialog={this.openDialog}
          getChannelList={this.props.getChannelList}
          changeChannel={this.changeChannel}
          channelList={this.props.channelList}
        ></AddChannel>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return {
    changeChannel (data) {
      dispatch({
        type: 'change_channel',
        value: data
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Aside)
