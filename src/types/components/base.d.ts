
import { CSSProperties } from 'react'

export interface AuComponent {
    prefixClass?: string

    className?: string | string[] | { [key: string]: boolean }

    customStyle?: string | CSSProperties

    color?: string

    inline?: boolean

    disabled: false
}

export default AuComponent
