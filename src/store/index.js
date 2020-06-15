import { createStore } from 'redux'
// 导入等会要创建的reducer文件
import reducer from './reducer'

// 创建一个store
let store = createStore(reducer)

export default store
