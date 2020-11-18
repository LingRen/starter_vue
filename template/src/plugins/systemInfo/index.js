/**
 * Author: ling
 * Create Time: 2018/10/29 11:27
 * Description: 设备信息
 */

/**
 * 判断数组中某一个，是否包含该字符串
 * @param arr    数组
 * @param str    字符串
 * @returns {*}  数组中的位置，不存在返回-1
 */
function contains (arr, str) {
  for (let i in arr) {
    if (str.includes(arr[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * 获取当前设备信息
 * @returns {*}
 */
// eslint-disable-next-line camelcase
let $_lingSystemInfo = {};

function systemInfo () {
  try {
    if ($_lingSystemInfo.hasData) {
      return $_lingSystemInfo.systemInfo;
    }

    let ua = navigator.userAgent;

    // system info
    let systemInfo = {
      isMobile: false,
      isWeChat: false,
      weChatVersion: 'Unknown',
      protocol: '',
      network: 'Unknown',
      device: 'Unknown',
      system: 'Unknown',
      ua: 'Unknown',
      isAndroid: false,
      isIos: false
    };

    systemInfo.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/);
    systemInfo.isWeChat = ua.indexOf('MicroMessenger') > -1;

    // device & system
    let iPod = ua.match(/(ipod).*\s([\d_]+)/i);
    let iPad = ua.match(/(ipad).*\s([\d_]+)/i);
    let iPhone = ua.match(/(iphone)\sos\s([\d_]+)/i);
    let android = ua.match(/(android)\s([\d\.]+)/i);

    if (android) {
      systemInfo.system = 'Android ' + android[2];
      systemInfo.systemVersion = android[2];
      systemInfo.isAndroid = true;
      let arr = ua.split(';');
      let i = contains(arr, 'Build/');
      if (i > -1) {
        systemInfo.device = arr[i].substring(0, arr[i].indexOf('Build/')).trim();
      }
    } else if (iPhone) {
      systemInfo.isIos = true;
      systemInfo.system = 'iOS ' + iPhone[2].replace(/_/g, '.');
      systemInfo.systemVersion = iPhone[2].replace(/_/g, '.');
      systemInfo.device = 'iPhone';
    } else if (iPad) {
      systemInfo.isIos = true;
      systemInfo.system = 'iOS ' + iPad[2].replace(/_/g, '.');
      systemInfo.systemVersion = iPad[2].replace(/_/g, '.');
      systemInfo.device = 'iPad';
    } else if (iPod) {
      systemInfo.isIos = true;
      systemInfo.system = 'iOS ' + iPod[2].replace(/_/g, '.');
      systemInfo.systemVersion = iPod[2].replace(/_/g, '.');
      systemInfo.device = 'iPod';
    }

    // weChat client version
    let version = ua.match(/MicroMessenger\/([\d\.]+)/i);
    if (version && version[1]) {
      systemInfo.weChatVersion = version[1];
    }

    // HTTP protocol
    if (location.protocol === 'https:') {
      systemInfo.protocol = 'HTTPS';
    } else if (location.protocol === 'http:') {
      systemInfo.protocol = 'HTTP';
    } else {
      systemInfo.protocol = location.protocol.replace(':', '');
    }

    // network type
    let network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g);
    if (network && network[0]) {
      network = network[0].split('/');
      systemInfo.network = network[1];
    }

    // navigator userAgent
    systemInfo.ua = ua;

    // eslint-disable-next-line camelcase
    $_lingSystemInfo = {
      systemInfo,
      hasData: true
    };

    return systemInfo;
  } catch (e) {
    return {};
  }
}

export default {
  install (Vue) {
    Vue.prototype.$lingEnv = systemInfo;
    Vue.lingEnv = systemInfo;
  }
};
