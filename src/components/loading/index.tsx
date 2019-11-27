import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components'


export interface LoadingProps {
  size?: 'large' | 'small' | 'normal'
  color?: string
  inline?: boolean
  inverse?: boolean
  prefixCls?: string
  className?: any,
  space?: number 
}

export default class AuLoading extends Component<LoadingProps, any> {

  static options = {
    addGlobalClass: true
  }

  constructor () {
    super(...arguments)
  }


  render () {
    let { color, size, prefixCls, inline, className, inverse, space } = this.props
    
    const sizeStyle = {
      width: size ? `${Taro.pxTransform(parseInt(size))}` : '',
      height: size ? `${Taro.pxTransform(parseInt(size))}` : '',
      marginRight: space ? `${Taro.pxTransform(space)}` : ''
    }

    if(inverse) color = '#fff'

    const colorStyle = {
      'border': color ? `1px solid ${color}` : '',
      'border-color': color ? `${color} transparent transparent transparent` : '',
    }

    const ringStyle = Object.assign({}, colorStyle, sizeStyle)

    const wrapCls = classnames(prefixCls, className, {
      [`inline`]: inline
    });

    return (
      <View className={wrapCls} style={sizeStyle}>
        <View className={`${prefixCls}_ring`} style={ringStyle}></View>
        <View className={`${prefixCls}_ring`} style={ringStyle}></View>
        <View className={`${prefixCls}_ring`} style={ringStyle}></View>
      </View>
    )
  }
}

AuLoading.defaultProps = {
  size: 0,
  space: 10,
  color: '',
  prefixCls: 'au-loading',
}

AuLoading.propTypes = {
  size: PropTypes.number,
  space: PropTypes.number,
  color: PropTypes.string,
  inline: PropTypes.bool,
  inverse: PropTypes.bool
}
