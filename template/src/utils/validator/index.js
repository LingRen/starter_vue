/**
 * 校验
 */
const LingStrategies = {
  isNonEmpty (value, errMsg) {
    if (value === '') {
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
    this.cache = new Map()
  }

  add (value, rules, key) {
    if (!this.cache.has(key)) {
      this.cache.set(key, [])
    }
    for (const rule of rules) {
      // 自定义校验方法
      const validator = rule.validator
      if (validator) {
        this.cache.get(key).push(() => {
          const strategyArr = [value, rule.errorMsg]
          return validator.apply(null, strategyArr)
        })
        return
      }

      // 把strategy与参数分开
      const strategyArr = rule.strategy.split(':')
      const errorMsg = rule.errorMsg

      this.cache.get(key).push(() => {
        const strategy = strategyArr.shift()
        strategyArr.unshift(value)
        strategyArr.push(errorMsg)

        return LingStrategies[strategy].apply(null, strategyArr)
      })
    }
  }

  start () {
    const result = {
      hasError: false,
      errorMessage: {}
    }
    for (const [key, ruleFunctions] of this.cache) {
      for (const validatorFunc of ruleFunctions) {
        if (!result.errorMessage[key]) {
          result.errorMessage[key] = []
        }
        const errorMsg = validatorFunc()
        if (errorMsg) {
          result.hasError = true
          result.errorMessage[key].push(errorMsg)
        }
      }
    }

    return result
  }
}

export const validationPlugin = {
  beforeCreate () {
    if (this.$options.validations) {
      this.$options.computed = Object.assign({
        getFormData () {
          return {}
        }
      }, this.$options.computed, {
        $lingValidator () {
          const rules = this.$options.validations
          const lingValidator  = new LingValidator()

          Object.keys(rules).forEach(key => {
            const rule = rules[key]
            // ? 如何优雅获取到对应的表单对象呢
            const value = this.getFormData[key]
            lingValidator.add(value, rule, key)
          })

          return lingValidator.start()
        }
      })
    }
  }
}
