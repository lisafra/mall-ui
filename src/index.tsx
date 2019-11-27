import Taro from '@tarojs/taro'
import './style/index.scss'
import './style/themes/red.scss'
import './style/themes/gold.scss'
import './style/themes/orange.scss'

Taro.initPxTransform({ designWidth: 750 })

export { default as AuButton } from './components/button'
export { default as AuTab } from './components/tab'
export { default as AuTabPanel } from './components/tab/panel'
export { default as AuMenu } from './components/menu'
export { default as AuImage } from './components/image'
export { default as AuLoading } from './components/loading'
export { default as AuIcon } from './components/icon'
