import AES from 'crypto-js/aes'
import UTF8 from 'crypto-js/enc-utf8'

const INFO_KEY = '{{ name }}'
const INFO_EXPIRES_KEY = '{{ name }}_TM'

const stringConversion = (str, time) => {
  return AES.encrypt(str, time + INFO_EXPIRES_KEY).toString()
}

const conversionString = (str, time) => {
  return AES.decrypt(str, time + INFO_EXPIRES_KEY).toString(UTF8)
}

export function setCookie(cookieName, days = 1 /  24 / 2) {
  const now = new Date() // 获取时间
  now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
  let str = stringConversion(JSON.stringify(cookieName), now.getTime() + '')
  localStorage.setItem(INFO_KEY, str)
  localStorage.setItem(INFO_EXPIRES_KEY, now.getTime() + '')
}

//读取cookie
export function getCookie () {
  try {
    const communityHospitalInfoExpires = +localStorage.getItem(INFO_EXPIRES_KEY)
    if (communityHospitalInfoExpires <= Date.now()) {
      deleteCookie()
      return {}
    }

    return JSON.parse(conversionString(localStorage.getItem(INFO_KEY), communityHospitalInfoExpires + ''))
  } catch (e) {
    deleteCookie()
  }
  return {}
}

//删除cookie值
export function deleteCookie() {
  localStorage.removeItem(INFO_KEY)
  localStorage.removeItem(INFO_EXPIRES_KEY)
}
