import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './ComponentName.scss'

export default class ComponentName extends Component {
  constructor() {
    super(...arguments)
  }

  hello (){
    console.log("qeee");
  }

  componentWillMount() {
    console.log(this.props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <View></View>
  }
}

ComponentName.defaultProps = {
  prop: false
}

ComponentName.PropTypes = {
  prop: PropTypes.bool
}
