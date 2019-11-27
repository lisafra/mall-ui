const globalData:any = {}

export const TAB_CURRENT = 'TAB_CURRENT'

export function getGlobalData(key:string) {
  return globalData[key]
}

export function setGlobalData(key:string, val:any) {
  globalData[key] = val
}
