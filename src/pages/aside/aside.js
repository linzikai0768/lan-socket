import React from 'react'
import './aside.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
class Aside extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    let { channelList, channelId } = this.props
    return (
      <div className='aside'>
        <div className='tool'>
          <Button variant='contained' color='primary' href='#contained-buttons'>
            创建群
          </Button>
          <Button variant='contained' color='primary' href='#contained-buttons'>
            加入群
          </Button>
        </div>
        <Divider />
        <List component='nav' aria-label='main mailbox folders'>
          {channelList.map((item, index) => (
            <ListItem button key={item.channelId}>
              <ListItemText
                primary={item.channelName}
                className={channelId === index ? 'color' : ''}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    )
  }
}

export default Aside
