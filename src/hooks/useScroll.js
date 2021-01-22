import { useEffect } from 'react'

function useScroll(wrapperEl, contentEl, delta = 55) {
  useEffect(() => {
    if (!wrapperEl || !contentEl) {
      return
    }
    const wheelCallback = e => {
      e.preventDefault()
      e.stopPropagation()
      const wrapperEl_clientHeight = wrapperEl.clientHeight
      const contentEl_clientHeight = contentEl.clientHeight
      if (wrapperEl_clientHeight >= contentEl_clientHeight) {
        return
      }
      const contentEl_minTop = wrapperEl.clientHeight - contentEl.clientHeight
      const contentEl_offsetTop = contentEl.offsetTop
      let targetTop = contentEl_offsetTop + delta * (e.deltaY > 0 ? -1 : 1)
      if (targetTop > 0) {
        targetTop = 0
      } else if (targetTop < contentEl_minTop) {
        targetTop = contentEl_minTop
      }
      contentEl.style.top = targetTop + 'px'
    }
    contentEl.addEventListener('wheel', wheelCallback, { passive: false })
    return () => {
      contentEl.removeEventListener('wheel', wheelCallback)
    }
  }, [wrapperEl, contentEl, delta])
}

export default useScroll

