import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AuMenu } from '../../ui'

const iconMsg = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-message.png'
const iconCart = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-cart.png'
const iconContact = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-contact.png'

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
    return (
      <View className='g-page'>

        <View className='g-page__title'>
          <Text className='text'>Menu</Text>菜单
        </View>

        <View className='g-page__content'>
          {/* 基本用法 */}
          <View className="g-page__sub-title">基本用法</View>
          <AuMenu title='标题文字'></AuMenu>
          <AuMenu title='标题文字'>其它文字</AuMenu>
          <AuMenu title='标题文字' arrow={false}>没有箭头</AuMenu>
          <AuMenu title='禁用状态' disabled>disabled</AuMenu>
          {/* 带图片 */}
          <View className="g-page__sub-title top60" >包含图片</View>
          <AuMenu title='我的订单' icon={iconCart}></AuMenu>
          <AuMenu title='系统消息' icon={iconMsg}></AuMenu>
          <AuMenu title='联系客服' icon={iconContact} iconGutter={24}>图片边距24， 默认18</AuMenu>
          {/* 有分割线 */}
          <View className="g-page__sub-title top60" >有分割线</View>
          <AuMenu title='我的订单' icon={iconCart} line></AuMenu>
          <AuMenu title='系统消息' icon={iconMsg} line></AuMenu>
          <AuMenu title='联系客服' icon={iconContact} line></AuMenu>
          {/* 自定义高度 */}
          <View className="g-page__sub-title top60" >自定义高度</View>
          <AuMenu title='我的订单' icon={iconCart} line >默认116</AuMenu>
          <AuMenu title='系统消息' icon={iconMsg} line height={88}>88</AuMenu>
          <AuMenu title='联系客服' icon={iconContact} line height={160}>200</AuMenu>
           {/* 自定义icon边跟 */}
           <View className="g-page__sub-title top60" >自定义icon右边距</View>
          <AuMenu title='我的订单' icon={iconCart} iconGutter={10}>10</AuMenu>
          <AuMenu title='系统消息' icon={iconMsg} >默认18</AuMenu>
          <AuMenu title='联系客服' icon={iconContact} iconGutter={30} >30</AuMenu>

        </View>
        
      </View>
    )
  }
}
