import download from 'downloadjs'

export default {
  install(Vue) {
    Vue.prototype.$lingDownload = download
  }
}
