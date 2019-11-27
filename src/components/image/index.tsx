import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import * as PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components'
import { formatStyle } from '@src/style/utils';
import AuLoading from '../loading';
import './index.scss'

export interface ImageProps {
  prefixCls?: string
  className?: any
  style?: any
  // 固定图形某一边的尺寸
  fixSize?: number 
  left?: number
  right?: number
  src?: any
  placeholder?: boolean
  square?: boolean
  radius?: number,
  circle?: boolean
}

export default class AuImage extends Component<ImageProps, any> {

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

  getSty () {
    // 获取原始图片宽高
    let {width, height} = this.state
    // 获取图片的固定尺寸，是否方形，是否有圆角
    let {fixSize, square, radius, left, right} = this.props

    // 定义图片容器样式
    let wrapSty:any = {}
    if (!width || !height) return { wrapSty } // 如果原始图片没有宽或高，即图片没有load完, 或者加载出错，则停止样式计算
    if (radius) wrapSty.borderRadius = radius // 定义容器的圆角
    
    // 定义图片的样式
    let style:any = {}
    if (!fixSize) {
      style = {width, height} // 没有给固定尺寸，则表示展示图片原始尺寸
    } else {
      let mode = width > height ? 'fixH' : 'fixW' // 自动识别mode, 以短的一边固定
      const ratio = width / height  // 获取真实图片的尺寸比例
      switch (mode) {
        case 'fixW':   // 固定宽度，高度自适配，且相对容器上下居中, 需给定size
          style.width = fixSize
          style.height = fixSize / ratio
          break
        case 'fixH': // 固定高度，宽度自适配，且相对容器左右居中, 需给定size
          style.height = fixSize
          style.width = fixSize * ratio
          break
      }
    }

    if (left) style.marginLeft = left
    if (right) style.marginRight = right

    return {
      // 设置容器的样式： 如果容器的宽高等于size，如果不是，不指定容器的宽高
      wrapSty: formatStyle(square && fixSize ? {...wrapSty, width: fixSize , height: fixSize } : style),
      // 设置图片的样式
      imgSty: formatStyle(style)
    }
  }

  render () {

    const {src, className, prefixCls, placeholder, circle } = this.props
    const {loadError} = this.state

    const {wrapSty, imgSty} = this.getSty()

    const wrapCls = classnames(prefixCls, className, {
      [`circle`]: circle
    });


    return (
      <View className={wrapCls} style={wrapSty}>
        { src && placeholder && (
          <View className={`${prefixCls}__placeholder`}>
            {!loadError && <AuLoading inverse />}
          </View>
        )}
        {
          src && 
          <Image
            className={`${prefixCls}__inner`}
            style={imgSty}
            src={src}
            onLoad={e => {
              const {width, height} = e.detail
              this.setState({width, height})
            }}
            onError={() => this.setState({loadError: true})}
          />
        }
      </View>
    )
  }
}

AuImage.defaultProps = {
  prefixCls: 'au-img'
}

AuImage.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  fixSize: PropTypes.number,
  src: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  placeholder: PropTypes.bool,
  square: PropTypes.bool,
  radius: PropTypes.number,
  circle: PropTypes.bool
}