import axios from 'axios'
{{#if_eq device "pc"}}
import { Message as Toast } from 'element-ui'
{{/if_eq}}

{{#if_eq device "mobile"}}
import { Toast } from 'vant'
{{/if_eq}}

axios.defaults.baseURL = WX_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 状态码错误信息
const codeMessage = {
  200: '请求成功',
  201: '保存成功',
  202: '正在处理',
  204: '删除成功',
  400: '请求错误',
  401: '请登录',
  403: '请求禁止',
  404: '未找到服务',
  406: '请求格式错误',
  410: '请求的资源被永久删除',
  422: '验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

// TODO:还需要增加全局loading，{ loadingStatus, loadingCount }
// TODO:增加取消请求操作，实现方案：全局cancel，局部自定义

const toastMessage = (res) => {
  if (res.config && res.config.customMessage) {
    return
  }
  Toast({
    type: {{#if_eq device "pc"}}'error'{{/if_eq}}{{#if_eq device "mobile"}}'fail'{{/if_eq}},
    message: res.message || res.data.message || codeMessage[res.status] || '未知错误',
    duration: 3500
  })
}

axios.interceptors.request.use(function (config) {
  if (config.noCheck) {
    return config
  }

  // TODO: 判读用户信息，如处理未登录等情况
  return config
}, function (error) {
  toastMessage(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.data.success !== false) {
    return response.data
  }

  toastMessage(response)
  return Promise.reject(response)
}, function (response) {
  toastMessage(response)
  return Promise.reject(response)
})

export default axios
