import { staticInfo } from 'nuo-access-vue'
import LingOssUpload from 'ling-oss-upload'

const lingOssUpload = new LingOssUpload({
  accessId: staticInfo().accessid,
  accessKey: staticInfo().accesskey
}, {
  rootDir: "formal"
});

export default {
  install(Vue) {
    Vue.prototype.$lingOssUpload = lingOssUpload
  }
}
