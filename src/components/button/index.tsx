import Taro, { Component } from '@tarojs/taro'
import { CommonEventFunction } from '@tarojs/components/types/common'
import classnames from 'classnames'
import * as PropTypes from 'prop-types';
import { View, Form, Button } from '@tarojs/components'
import AuLoading from '../loading';
import { generateStyle } from '@src/style/utils';

export interface ButtonProps {
  prefixCls?: string
  className?: any
  container?: boolean
  type?: 'primary' | 'warn' | 'success'
  formType?: 'submit' | 'reset'
  size?: 'large' | 'small' | 'normal',
  color?: string,
  loading?: boolean,
  plain?: boolean,
  radius?: number,
  width?: number,
  height?: number,
  top?: number,
  bottom?: number,
  circle?: boolean,
  shadow?: boolean,
  stop?: boolean,
  fixed?: boolean
  inline?: boolean
  icon?: string
  disabled?: boolean
  activeClassName?: string
  style?: object
  // start Button props
  openType?: 'contact' | 'share' | 'getUserInfo' | 'getPhoneNumber' | 'launchApp' | 'openSetting' | 'feedback' | 'getRealnameAuthInfo'
  lang?: string
  sessionFrom?: string
  sendMessageTitle?: string,
  sendMessagePath?: string,
  sendMessageImg?: string,
  showMessageCard?: boolean,
  appParameter?: string,
  onGetUserInfo?: CommonEventFunction
  onContact?: CommonEventFunction
  onGetPhoneNumber?: CommonEventFunction
  onError?: CommonEventFunction
  onOpenSetting?: CommonEventFunction
  onClick?: CommonEventFunction
}

export default class AuButton extends Component<ButtonProps, any> {

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

  onGetUserInfo () {
    this.props.onGetUserInfo && this.props.onGetUserInfo(...arguments)
  }

  onContact () {
    this.props.onContact && this.props.onContact(...arguments)
  }

  onGetPhoneNumber () {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(...arguments)
  }

  onError () {
    this.props.onError && this.props.onError(...arguments)
  }

  onOpenSetting () {
    this.props.onOpenSetting && this.props.onOpenSetting(...arguments)
  }

  onSumit () {
    console.log('submit')
    if (this.state.isWEAPP || this.state.isWEB) {
      this.$scope.triggerEvent('submit', arguments[0].detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  onReset () {
    if (this.state.isWEAPP || this.state.isWEB) {
      this.$scope.triggerEvent('reset', arguments[0].detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  render () {

    const {
      className,
      prefixCls,
      type,
      plain,
      size,
      radius,
      width,
      height,
      top,
      bottom,
      fixed,
      shadow,
      stop,
      circle,
      inline,
      disabled,
      color,
      icon,
      style,
      loading,
      formType,
      openType,
      container,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      showMessageCard,
      appParameter,
    } = this.props;

    const {
      isWEAPP,
    } = this.state

    const iconType: any = loading ? 'loading' : icon;
    const wrapCls = classnames(prefixCls, className, {
      [`primary`]: type === 'primary',
      [`warn`]: type === 'warn',
      [`success`]: type === 'success',
      [`small inline`]: size === 'small',
      [`plain`]: plain,
      [`circle`]: circle,
      [`fixed`]: fixed,
      [`shadow`]: shadow,
      [`inline`]: inline,
      [`disabled`]: disabled,
      [`loading`]: loading,
      [`icon`]: !!iconType,
      [`container`]: container
    });


    const button = <Button className={`${prefixCls}-btn`}
      type={formType === 'submit' || formType === 'reset' ? formType : 'button'}
      formType={formType}
      openType={openType}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      showMessageCard={showMessageCard}
      appParameter={appParameter}
      onGetUserInfo={this.onGetUserInfo.bind(this)}
      onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
      onOpenSetting={this.onOpenSetting.bind(this)}
      onError={this.onError.bind(this)}
      onContact={this.onContact.bind(this)}
    >
    </Button>

    const colorStyle:any = {}
    if (color) {
      if (plain) {
        colorStyle.border = `1px solid ${color}`
        colorStyle.color= color
      } else {
        colorStyle.backgroundColor = color
        colorStyle.color = '#fff'
        colorStyle.border = 'none'
      }
    }

    return (
      <View 
        className={fixed ? `fixed-container` : wrapCls}
        style={
          {
            ...colorStyle,
            ...style,
            ...generateStyle({radius, width, height, top, bottom})
          }
        }
        onClick={e => {
          if (disabled) return
          if (stop) e.stopPropagation()
          this.props.onClick && this.props.onClick(e)
        }}
      >
        {loading && <AuLoading inverse={!plain} color={color}></AuLoading>}
        {isWEAPP && !disabled && <Form reportSubmit onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>{button}</Form>}
        {!isWEAPP && !disabled && button}
        {fixed && 
          <View 
            className={wrapCls}
            style={
              {
                ...colorStyle,
                ...generateStyle({radius, width, height, top, bottom})
              }
            }
          >
            {this.props.children}
          </View> 
        }
        {!fixed && this.props.children}
      </View>
    )
  }
}

AuButton.defaultProps = {
  prefixCls: 'au-button',
  size: 'large',
  disabled: false,
  loading: false,
  activeStyle: {},
}

AuButton.propTypes = {
  size: PropTypes.oneOf(['normal', 'small', 'large']),
  type: PropTypes.oneOf(['primary', 'ghost', 'warning']),
  circle: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  stopp: PropTypes.bool,
  shadow: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf(['contact', 'share', 'getUserInfo', 'getPhoneNumber', 'launchApp', 'openSetting', 'feedback', 'getRealnameAuthInfo', '']),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
}