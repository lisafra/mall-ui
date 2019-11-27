import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AuMenu, AuImage } from '../../ui'
import {routes} from '../../routes'

const logo = require('../../asserts/jd-pay.jpg')

export default class Index extends Component {

  config: Config = {
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getPhoneNumber (e: any) {
    console.log('获取用户手机相关信息', e)
  }

  render () {
    const navList = Object.keys(routes)
    return (
      <View className='g-page'>
        

        <View className='g-page__logo'>
          <AuImage src={logo} fixSize={200} />
          <Text className='text'>Alita UI</Text>
        </View>

        <View className='g-page__content'>
          {
            navList.map((key:string, index:number) => {
              const item:any = routes[key]
              return (
                <AuMenu 
                  title={key} 
                  key={`menu${index}`}
                  line
                  onClick={() => Taro.navigateTo({url: item.path})}
                />
              )
            })
          }
          
          {/* <AuMenu title='系统消息' icon={iconMsg}></AuMenu> */}
          {/* <AuMenu title='联系客服' icon={iconContact} iconGutter={24}>图片边距24， 默认18</AuMenu> */}
        </View>
        
      </View>
    )
  }
}
