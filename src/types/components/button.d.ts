
import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import AuComponent from './base'

export interface ButtonProps extends AuComponent{
    type?: 'primary' | 'warning' | 'ghost'

    size?: 'large' | 'small'

    loading?: boolean

    role?: string

    activeClassName?: string

    activeStyle?: boolean

    // start Button props
    formType?: 'submit' | 'reset'
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
    // end Button props
}

declare const AuButton: ComponentClass<ButtonProps>

export default AuButton