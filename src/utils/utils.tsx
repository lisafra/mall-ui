
import Taro from '@tarojs/taro'
import { routes } from '../routes'
// import * as React from 'react'

export function isString(str: any) {
    return typeof str === 'string';
}

// export function insertSpace(child: any) {
//     if (isString(child.type) && isTwoCNChar(child.props.children)) {
//         return React.cloneElement(
//         child,
//         {},
//         child.props.children.split('').join(' '),
//         );
//     }
//     if (isString(child)) {
//         if (isTwoCNChar(child)) {
//         child = child.split('').join(' ');
//         }
//         return <span>{child}</span>;
//     }
//     return child;
// }

// 路由跳转方法封装
export const routeTo = ({
    name = 'index',
    routeType = 'navigateTo',
    params,
    delta = 1
  }) => {
    const { path, tabBar } = routes[name]
    const url = formatUrlParams(path, params)
    if (tabBar) routeType = 'switchTab'
    if (routeType === 'navigateBack') {
      console.log('跌幅跳转啦', delta, routeType)
      Taro.navigateBack({delta: parseInt(delta)})
      return
    }
    Taro[routeType]({ url })
  }
  
  // 格式化url
  export function formatUrlParams(url, params) {
    let stringParams = !params || !url ? '' : '?'
    console.log(url)
  
    if (params) {
      const paramKeys = Object.keys(params)
      paramKeys.forEach((key, index) => {
        const endSymbol = index < paramKeys.length - 1 ? '&' : ''
        const value = params[key]
        const formatValue =
          typeof value === 'string'
            ? encodeURIComponent(value)
            : JSON.stringify(value)
        stringParams += `${key}=${formatValue}${endSymbol}`
      })
    }
    return url + stringParams
  }
  