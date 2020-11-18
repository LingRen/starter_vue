{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
{{#if_eq px "rem"}}
import "lib-flexible"
{{/if_eq}}
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
{{#router}}
import router from '@/router'
{{/router}}
{{#store}}
import store from '@/store'
{{/store}}

{{#router}}
{{#store}}
import {sync} from 'vuex-router-sync'
sync(store, router)
{{/store}}
{{/router}}


const allPlugins = (r => {
  return r.keys().map(key => r(key).default)
})(require.context('@/plugins', true, /.*\/index\.js$/))

allPlugins.map(val => {
  Vue.use(val)
})

{{#if_eq device "pc"}}
import Element, {
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.use(Element)
{{/if_eq}}
{{#if_eq device "mobile"}}
import {
  Icon,
  Divider,
  Toast,
  Notify,
  Overlay,
  Dialog,
  Loading,
  Lazyload
} from 'vant'

Vue.use(Icon)
Vue.use(Divider)
Vue.use(Notify)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Lazyload, {
  lazyComponent: true
})
{{/if_eq}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#store}}
  store,
  {{/store}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
