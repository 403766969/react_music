export const throttle = (callback, delay = 1000) => {
  let timer = null
  return (...args) => {
    if (!timer) {
      callback && callback.apply(null, args)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

export const debounce = (callback, delay = 1000) => {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback && callback.apply(null, args)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}
