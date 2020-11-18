import wx from 'weixin-js-sdk'

const plugin = {
  install (Vue) {
    Vue.prototype.$wechat = wx
  }
};

export default plugin
