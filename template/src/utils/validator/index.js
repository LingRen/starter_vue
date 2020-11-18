/**
 * 校验
 */
const LingStrategies = {
  isNonEmpty (value, errMsg) {
    if (!value) {
      return errMsg
    }
  },
  minLength (value, length, errMsg) {
    if (value.length < length) {
      return errMsg
    }
  },
  maxLength (value, length, errMsg) {
    if (value.length > length) {
      return errMsg
    }
  },
  min (value, min, errMsg) {
    if (value < min) {
      return errMsg
    }
  },
  max (value, max, errMsg) {
    if (value > max) {
      return errMsg
    }
  },
  isMobile (value, errMsg) {
    if (!/^1[0-9]{10}$/.test(value)) {
      return errMsg
    }
  },
  isPhone (value, errMsg) {
    if (!/^((0\d{2,3}-\d{7,8})|(1[0-9]{10}))$/.test(value)) {
      return errMsg
    }
  }
}

export default class LingValidator {
  constructor () {
    this.cache = []
  }

  add (value, rules) {
    for (const rule of rules) {
      // 自定义校验方法
      const validator = rule.validator
      if (validator) {
        this.cache.push(() => {
          const strategyArr = [value, rule.errorMsg]
          return validator.apply(null, strategyArr)
        })
        return
      }

      // 把strategy与参数分开
      const strategyArr = rule.strategy.split(':')
      const errorMsg = rule.errorMsg

      this.cache.push(() => {
        const strategy = strategyArr.shift()
        strategyArr.unshift(value)
        strategyArr.push(errorMsg)

        return LingStrategies[strategy].apply(null, strategyArr)
      })
    }
  }

  start () {
    for (const validatorFunc of this.cache) {
      const errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}
