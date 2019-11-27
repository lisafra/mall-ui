import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AuButton, AuImage } from '../../ui'

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: 'button'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getPhoneNumber (e: any) {
    Taro.showModal({
      title: '提示',
      content: JSON.stringify(e)
    })
    console.log('获取用户手机相关信息', e)
  }

  render () {
    return (
      <View className='g-page'>

        <View className='g-page__title'>
          <Text className='text'>button</Text>按钮
        </View>

        <View className='g-page__content' style={{padding: `${Taro.pxTransform(30)}`}}>

          {/* 基本用法 */}

          <View className="g-page__sub-title">主题色系</View>
          <AuButton type='primary' top={40}>primary</AuButton>
          <AuButton type='primary' plain top={40}>primary plain</AuButton>
          <AuButton type='primary' plain top={40} circle>primary plain circle</AuButton>
          <AuButton type='primary' top={40} circle disabled bottom={80}>primary circle disabled</AuButton>

          <View className="g-page__sub-title">次主题色系</View>
          <AuButton top={40}>default</AuButton>
          <AuButton plain top={40}>plain</AuButton>
          <AuButton plain top={40} circle>circle</AuButton>
          <AuButton plain top={40} disabled bottom={80}>plain disabled</AuButton>

          <View className="g-page__sub-title">自定义色系</View>
          <AuButton type='warn' top={40}>warn</AuButton>
          <AuButton type='success' top={40}>success</AuButton>
          <AuButton color='#333' plain top={40}>color #333 plain</AuButton>
          <AuButton color='orange' top={40}>color orange</AuButton>
          <AuButton color='orange' plain top={40} bottom={80}>color plain</AuButton>

          <View className="g-page__sub-title">loading状态</View>
          <AuButton type='primary' top={40} circle loading> primary circle</AuButton>
          <AuButton top={40} circle loading disabled bottom={80}> diabled circle</AuButton>

          <View className="g-page__sub-title">自定义圆角</View>
          <AuButton type='primary' top={40} radius={0}>radius 0</AuButton>
          <AuButton type='primary' plain top={40} radius={12} bottom={80}>radius 12</AuButton>

          <View className="g-page__sub-title">自定义样式</View>
          <AuButton 
            color='#333' 
            plain 
            top={40} 
            style={{borderColor: '#DADADA', fontWeight: 'bold'}}
          >color #333 plain</AuButton>

          <View>
            <AuButton 
              type='primary'
              size='small'
              top={30}
              circle
            >small</AuButton>

          <AuButton 
              type='primary'
              size='small'
              plain
              top={30}
              circle
            >small</AuButton>

            <AuButton 
              size='small'
              plain
              top={30}
            >small button </AuButton>

              {/* 不带圆角 */}
          <AuButton 
            width={320}
            height={80} 
            top={20}
            inline
            bottom={80}
          >custom button </AuButton>
          </View>


          {/* 透明的button，带点击功能和小程序原生能力的容器 */}
          <View className="g-page__sub-title">小程序原生功能</View>
          <AuButton openType='getPhoneNumber' top={40}>getPhoneNumber</AuButton>
          <AuButton openType='getUserInfo' top={40}>getUserInfo</AuButton>
          <AuButton openType='contact' top={40} bottom={80}>contact</AuButton>

          <View className="g-page__sub-title">带原生功能的容器</View>
          <View>
            自定义图片button：
            <AuButton container openType='share' bottom={80}>
              <AuImage src={'http://storage.jd.com/indigomini/icon_share.png'} />
            </AuButton>
          </View>

          <View className="g-page__sub-title">固定在页面底部</View>
          <AuButton container bottom={60}></AuButton>
          {/* 不带圆角, 且固定在底部 */}
          <AuButton 
            type='primary'
            fixed
            shadow
            openType='getUserInfo'
            onGetUserInfo={this.getPhoneNumber.bind(this)}
          >fixed shadow</AuButton>
        </View>
        
      </View>
    )
  }
}