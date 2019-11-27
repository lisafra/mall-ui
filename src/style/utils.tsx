import Taro from '@tarojs/taro'

export interface styles {
    radius?: number,
    width?: number,
    height?: number
}

export function generateStyle(options:styles) {
    const {radius, width, height, top, bottom} = options
    const styleConfig:any = {}

    if (typeof radius === 'number') styleConfig.borderRadius = Taro.pxTransform(radius)
    if (width) styleConfig.width = Taro.pxTransform(width)
    if (height) {
        styleConfig.height = Taro.pxTransform(height)
        styleConfig.lineHeight = Taro.pxTransform(height - 2)
    }
    if (top) styleConfig.marginTop = Taro.pxTransform(top)
    if (bottom) styleConfig.marginBottom = Taro.pxTransform(bottom)


    return styleConfig
}

/* 生成style */
export function formatStyle(param:any = {}) {
    let styles:any = {}
    Object.keys(param).forEach(key => {
        const val = param[key]
        if (val) {
            styles[key] = typeof val === 'string' || ['opacity'].includes(val) ? val : Taro.pxTransform(val)
        }
    })
    // console.log('【格式化样式】', param, styles)
    return styles
}