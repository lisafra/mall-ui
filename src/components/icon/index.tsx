import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import * as PropTypes from 'prop-types';
import { View, Icon } from '@tarojs/components'
import './icon.scss'

export interface IconProps {
  prefixCls?: string
  className?: any
  style?: any
  size?: number,
  color?: string,
  name?: string,
  type?: 'success' | 'success_no_circle' | 'info' | 'warn' | 'waiting' | 'cancel' | 'download' | 'search' | 'clear'
}

export default class AuIcon extends Component<IconProps, any> {

  static options = {
    addGlobalClass: true
  }

  constructor () {
    super(...arguments)
  }

  state = {
    width: 0,
    height: 0,
    loadError: false
  }

  render () {

    const {className, prefixCls, type, size, color } = this.props

    const wrapCls = classnames(prefixCls, className, {
    
    });

    return (
      <View className={wrapCls}>
        { type && <Icon type={type} size={Taro.pxTransform(size)} color={color} />}
      </View>
    )
  }
}

AuIcon.defaultProps = {
  prefixCls: 'au-icon',
  size: 40
}

AuIcon.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  radius: PropTypes.number,
  circle: PropTypes.bool
}