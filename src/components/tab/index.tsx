import Taro, { Component } from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'
import classnames from 'classnames'
import * as PropTypes from 'prop-types';
import { isTest, uuid, mergeStyle } from '../utils';
import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import './tab.scss'
import { TAB_CURRENT, setGlobalData, getGlobalData } from '../global-data';



export interface TabProps {
  prefixCls?: string
  className?: any
  style?: object
  tabDirection?: string
  animated?: boolean,
  tabList?: any,
  height?: number,
  scroll?: boolean,
  swipeable?: boolean
  current: number
  underline?: boolean
  onClick?: CommonEventFunction
  activeStyle?: any,
  color?: string
  lineWidth?: number,
  lineColor?: string
  lineHeight?: number
}

const ENV = Taro.getEnv()
const MIN_DISTANCE = 100
const MAX_INTERVAL = 10

export default class AuTab extends Component<TabProps, any> {

  static options = {
    addGlobalClass: true
  }

  constructor () {
    super(...arguments)
    this.state = {
      _scrollLeft: '',
      _scrollTop: '',
      _scrollIntoView: '',
      activeIndex: this.props.current
    }

    this._tabId = isTest() ? 'tabs-AOTU2018' : uuid()
    // 触摸时的原点
    this._touchDot = 0
    // 定时器
    this._timer = null
    // 滑动时间间隔
    this._interval = 0
    // 是否已经在滑动
    this._isMoving = false
  }

  updateState = (idx:any) => {
    // 通知子组件更新面板
    setGlobalData(TAB_CURRENT, idx)
    console.log(getGlobalData(TAB_CURRENT))
    if (this.props.scroll) {
      const showIndex:number = Math.max(idx - 1, 0)
      // 标签栏滚动
      switch (ENV) {
        case Taro.ENV_TYPE.WEAPP:
        case Taro.ENV_TYPE.ALIPAY:
        case Taro.ENV_TYPE.SWAN:
          this.setState({_scrollIntoView: `tab${showIndex}`})
          break
        case Taro.ENV_TYPE.WEB: 
          const prevTabItem = this.tabHeaderRef.childNodes[showIndex]
          prevTabItem && this.setState({
            _scrollTop: prevTabItem.offsetTop,
            _scrollLeft: prevTabItem.offsetLeft
          })
          break
        default:
          break
      }
    }
  }

  handleClick (activeIndex:number) {
    console.log('更改当前的标签', activeIndex)
    // 如果选中的是高亮的tab, 不做任何操作
    if (activeIndex === this.state.activeIndex) return
    // 修改当前选中的tab索引
    this.setState({activeIndex})
    // 更新滚动的距离
    this.updateState(activeIndex)
    // 触发父组件勾子函数
    this.props.onClick && this.props.onClick(...arguments)
  }

  handleTouchStart (e:any) {
    const { swipeable, tabDirection } = this.props
    if (!swipeable || tabDirection === 'vertical') return
    // 获取触摸时的原点
    this._touchDot = e.touches[0].pageX
    // 使用js计时器记录时间
    this._timer = setInterval(() => {
      this._interval++
    }, 100)
  }

  handleTouchMove (e:any) {
    const {
      swipeable,
      tabDirection,
      tabList
    } = this.props

    const {activeIndex} = this.state

    if (!swipeable || tabDirection === 'vertical') return
    const touchMove = e.touches[0].pageX
    const moveDistance = touchMove - this._touchDot
    const maxIndex = tabList.length


    if (!this._isMoving && this._interval < MAX_INTERVAL && this._touchDot > 20) {
      // 向左滑动
      if (activeIndex + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
        this.handleClick(activeIndex + 1)
        this._isMoving = true

      // 向右滑动
      } else if (activeIndex - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
        this.handleClick(activeIndex - 1)
        this._isMoving = true
      }
    }
  }

  handleTouchEnd () {
    const { swipeable, tabDirection } = this.props
    if (!swipeable || tabDirection === 'vertical') return

    clearInterval(this._timer)
    this._interval = 0
    this._isMoving = false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.scroll !== this.props.scroll) {
      this.getTabHeaderRef()
    }
  }

  getTabHeaderRef () {
    if (ENV === Taro.ENV_TYPE.WEB) {
      this.tabHeaderRef = document.getElementById(this._tabId)
    }
  }

  componentDidMount () {
    this.getTabHeaderRef()
    this.updateState(this.props.current)
  }

  componentWillUnmount () {
    this.tabHeaderRef = null
  }

  render () {

    const {
      className,
      prefixCls,
      height,
      tabDirection,
      animated,
      tabList,
      scroll,
      underline,
      activeStyle,
      color,
      lineWidth,
      lineHeight,
      lineColor,
      style
    } = this.props;

    const {
      _scrollLeft,
      _scrollTop,
      _scrollIntoView,
      activeIndex
    } = this.state

    const heightStyle = { height }
    
    const underlineStyle:any = {
      // height: tabDirection === 'vertical' ? `${tabList.length * 100}%` : '1PX',
      // width: tabDirection === 'horizontal' ? `${tabList.length * 100}%` : '1PX'
    }
    if (color || lineColor) underlineStyle.background = lineColor || color
    if (lineWidth) {
      underlineStyle.width = Taro.pxTransform(lineWidth)
      underlineStyle.left = '50%'
      underlineStyle.marginLeft = `-${Taro.pxTransform(lineWidth/2)}`
    }
    if (lineHeight) underlineStyle.height = Taro.pxTransform(lineHeight)

    const bodyStyle:any = { }
    let transformStyle = `translate3d(0px, -${activeIndex * 100}%, 0px)`
    if (tabDirection === 'horizontal') {
      transformStyle = `translate3d(-${activeIndex * 100}%, 0px, 0px)`
    }
    if (!animated) {
      bodyStyle.transition = 'unset'
    }
    Object.assign(bodyStyle, {
      'transform': transformStyle,
      '-webkit-transform': transformStyle
    })

    const tabItems = tabList.map((item:any, idx:number) => {
      const itemCls = classnames({
        [`${prefixCls}__item`]: true,
        [`${prefixCls}__item--active`]: activeIndex === idx
      })

      let activeSly:any = {}

      if (activeIndex === idx) {
        if (activeStyle) activeSly = {...activeStyle}
        if (color) activeSly.color = color
      }

      return <View
        className={itemCls}
        style={{...style, ...activeSly}}
        id={`tab${idx}`}
        key={`item${idx}`}
        onClick={this.handleClick.bind(this, idx - 0)}
      >
        {item.title}
        {underline && (
          <View 
            className={`${prefixCls}__item-underline`} 
            style={underlineStyle}
          />)}
      </View>
    })

    const wrapCls = classnames(prefixCls, className, {
      [`${prefixCls}__scroll`]: scroll,
      [`at-tabs--${tabDirection}`]: true,
      [`at-tabs--${ENV}`]: true
    });

    const scrollX = tabDirection === 'horizontal'
    const scrollY = tabDirection === 'vertical'
    const headerCls = `${prefixCls}__header`

    return (
      <View className={wrapCls}>
        {
          scroll
            ? <ScrollView
              id={this._tabId}
              className={headerCls}
              style={heightStyle}
              scrollX={scrollX}
              scrollY={scrollY}
              scrollWithAnimation
              scrollLeft={_scrollLeft}
              scrollTop={_scrollTop}
              scrollIntoView={_scrollIntoView}
            >
              {tabItems}
            </ScrollView>
            : <View
              id={this._tabId}
              className={headerCls}
            >
              {tabItems}
            </View>
        }
        <View
          className={`${prefixCls}__body`}
          style={mergeStyle(bodyStyle, heightStyle)}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

AuTab.defaultProps = {
  prefixCls: 'au-tab',
  current: 0,
  tabList: [],
  tabDirection: 'horizontal',
  animated: true,
  underline: true
}

AuTab.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isTest: PropTypes.bool,
  height: PropTypes.string,
  tabDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  current: PropTypes.number,
  swipeable: PropTypes.bool,
  scroll: PropTypes.bool,
  animated: PropTypes.bool,
  tabList: PropTypes.array,
  onClick: PropTypes.func,
}