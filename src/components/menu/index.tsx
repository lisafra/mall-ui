import Taro, { Component } from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'
import classnames from 'classnames'
import * as PropTypes from 'prop-types';
import { View } from '@tarojs/components'
import { formatStyle } from '@src/style/utils';
import AuIcon from '../icon';
import './menu.scss'
import AuImage from '../image';

export interface ButtonProps {
  prefixCls?: string
  className?: string
  title: string
  icon?: any
  iconGutter?: number
  height?: number
  arrow?: boolean
  disabled?: boolean
  line?: boolean
  onClick?: CommonEventFunction
}

export default class AuMenu extends Component<ButtonProps, any> {

  static options = {
    addGlobalClass: true
  }

  constructor () {
    super(...arguments)
    this.state = {
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
    }
  }

  onClick () {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(...arguments)
    }
  }


  render () {

    const {
      className,
      prefixCls,
      height,
      disabled,
      icon,
      title,
      arrow,
      line,
      iconGutter
    } = this.props;

    const wrapCls = classnames(prefixCls, className, {
      [`disabled`]: disabled,
      [`icon`]: !!icon,
      [`line`]: line
    });

    return (
      <View 
        className={wrapCls}
        style={
          {
            ...formatStyle({minHeight: height})
          }
        }
        onClick={this.onClick.bind(this)}
      >
        <View className={`${prefixCls}__title`}>
          {icon && <AuImage src={icon} fixSize={40} right={iconGutter} />}
          {title}
        </View>
        <View className={`${prefixCls}__value`}>
          {this.props.children}
          {arrow && <AuIcon className={`arrow arrow-right`} />}
        </View>
      </View>
    )
  }
}

AuMenu.defaultProps = {
  prefixCls: 'au-menu',
  disabled: false,
  arrow: true,
  iconGutter: 18
}

AuMenu.propTypes = {
  arrow: PropTypes.string,
  disabled: PropTypes.string
}