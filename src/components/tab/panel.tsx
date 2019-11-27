import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import './tab.scss'


export interface TabPanelProps {
  prefixCls?: string
  className?: any
  tabDirection?: string
  current: number
  index: number
  key?:any
  style?: object
}

export default class AuTabPanel extends Component<TabPanelProps, any> {

  static options = {
    addGlobalClass: true
  }

  render () {

    const {
      className,
      tabDirection,
      prefixCls,
      index,
      style,
      key,
      current
    } = this.props;

    const wrapCls = classnames(prefixCls, className, {
      [`${prefixCls}--active`]: current === index,
      [`${prefixCls}--vertical`]: tabDirection === 'vertical'
    });


    return (
      <View className={wrapCls} style={{...style}} key={key}>
        {this.props.children}
      </View>
    )
  }
}

AuTabPanel.defaultProps = {
  prefixCls: 'au-tab__item-content',
  current: 0,
  tabDirection: 'horizontal'
}

AuTabPanel.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}