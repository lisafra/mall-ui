/* 全局路由索引表 ： 通过pathName查找 */
const iconMsg = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-message.png'
// const iconCart = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-cart.png'
// const iconContact = 'http://storage.jd.com/shopmall-miniapp/indigo/icon-contact.png'

export const routes:any = {
  tab: {
    pageTitle: '',
    icon: iconMsg,
    path: '/pages/tab/index'
  },
  menu:  {
    pageTitle: '',
    icon: iconMsg,
    path: '/pages/menu/index'
  },
  button: {
    pageTitle: '',
    icon: iconMsg,
    path: '/pages/button/index'
  },
  // image: {
  //   pageTitle: '',
  //   icon: iconMsg,
  //   path: '/pages/image/index'
  // },
  // loading: {
  //   pageTitle: '',
  //   icon: iconMsg,
  //   path: '/pages/loading/index'
  // },
  // icon: {
  //   pageTitle: '',
  //   icon: iconMsg,
  //   path: '/pages/icon/index'
  // }
}
