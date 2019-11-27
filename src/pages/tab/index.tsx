import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AuTab, AuTabPanel } from '../../ui'
import { AtTabs, AtTabsPane } from 'taro-ui'

// const iconMsg = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-message.png'
// const iconCart = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-cart.png'
// const iconContact = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-contact.png'

export default class Index extends Component {

  config: Config = {
  }

  state = {
    current1: 0,
    current2: 1,
    current3: 0,
    current4: 0,
    current5: 4,
    current6: 0,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  tabClick (current:number) {
    console.log(current)
  }

  handleClick (stateName:string, value:number) {
    this.setState({
      [stateName]: value
    })
  }

  render () {
    const tabList = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' }
    ]

    const tabList2 = [
      { title: '标签页1' },
      { title: '标签页2' }
    ]

    const tabList3 = [
      { title: '标签页1' },
      { title: '标签页2' },
    ]

    const tabList4 = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
    ]

    const { current1, current2, current3, current4, current5, current6 } = this.state

    return (
      <View className='g-page'>

        <View className='g-page__title'>
          <Text className='text'>Tab</Text>标签
        </View>

        <View className='g-page__content'>
          {/* 基本用法 */}
          <View className="g-page__sub-title">基本用法</View>
          <AuTab 
            tabList={tabList2} 
            current={0}
            onClick={this.handleClick.bind(this, 'current1')}
          >
            {
              tabList.map((tabItem, index) => {
                return (
                  <AuTabPanel current={current1} index={index} key={`tabitem1${index}`}>
                    <View className='tab-content'>{tabItem.title}的内容</View>
                  </AuTabPanel>
                )
              })
            }
          </AuTab>
          {/* 无下划线 */}
          <View className="g-page__sub-title">无下划线，指定当前页签</View>
          <AuTab 
            tabList={tabList3} 
            current={current2}
            underline={false}
            onClick={this.handleClick.bind(this, 'current2')}
          >
            {
              tabList.map((tabItem, index) => {
                return (
                  <AuTabPanel current={current2} index={index} key={`tab2${index}`}>
                    <View className='tab-content'>{tabItem.title}的内容</View>
                  </AuTabPanel>
                )
              })
            }
          </AuTab>

          {/* 指定当前tab页面 */}
          <View className="g-page__sub-title">固定多列, 面板无动画</View>

          <AuTab 
            tabList={tabList4} 
            current={0}
            animated={false}
            onClick={this.handleClick.bind(this, 'current3')}
          >
            {
              tabList.map((tabItem, index) => {
                return (
                  <AuTabPanel current={current3} index={index} key={`tabitem3${index}`}>
                    <View className='tab-content'>{tabItem.title}的内容</View>
                  </AuTabPanel>
                )
              })
            }
          </AuTab>

          {/* 可滚动标签 */}
          <View className="g-page__sub-title">可滚动标签</View>

          <AuTab 
            tabList={tabList} 
            current={current5}
            scroll
            onClick={this.handleClick.bind(this, 'current5')}
          >
            {
              tabList.map((tabItem, index) => {
                return (
                  <AuTabPanel current={current5} index={index} key={`tabitem${index}`}>
                    <View className='tab-content'>{tabItem.title}的内容</View>
                  </AuTabPanel>
                )
              })
            }
          </AuTab>

           {/* 可滑动面板切换 */}
           <View className="g-page__sub-title">可滑动面板切换</View>

          <AuTab 
            tabList={tabList} 
            current={current6}
            swipeable
            scroll
            onClick={this.handleClick.bind(this, 'current6')}
          >
            {
              tabList.map((tabItem, index) => {
                return (
                  <AuTabPanel current={current6} index={index} key={`tabitem${index}`}>
                    <View className='tab-content'>{tabItem.title}的内容</View>
                  </AuTabPanel>
                )
              })
            }
          </AuTab>

          
         
         {/* 自定义样式 */}
         
         <View className="g-page__sub-title">自定义样式</View>

          <AuTab 
            style={{fontSize: Taro.pxTransform(28)}}
            activeStyle={{color: '#333', fontWeight: 'bold'}}
            tabList={tabList3} 
            current={0}
            color={'#E82D64'}
          />

          <AuTab 
            style={{color: '#AAAAAA', fontWeight: 'bold'}}
            activeStyle={{color: '#333'}}
            tabList={tabList4} 
            current={0}
            scroll
            lineWidth={40}
            lineHeight={6}
            lineColor={'#E82D64'}
          />


        </View>
        
      </View>
    )
  }
}
