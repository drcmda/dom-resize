'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function resizeListener(el) {
    var win = el.target || el.srcElement
    win._dRRaf && cancelAnimationFrame(win._dRRaf)
    win._dRRaf = requestAnimationFrame(function() {
        return (
            win._dRTrigger &&
            win._dRTrigger._dRListeners.forEach(function(fn) {
                return fn.call(win._dRTrigger, el)
            })
        )
    })
}

function listen(el, fn) {
    var window = this
    var document = window.document
    var attachEvent = document.attachEvent

    var isIE = void 0
    if (typeof navigator !== 'undefined') {
        isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)
    }

    if (!el._dRListeners) {
        el._dRListeners = []
        if (attachEvent) {
            el._dRTrigger = el
            el.attachEvent('onresize', resizeListener)
        } else {
            getComputedStyle(el).position === 'static' && el.style.setProperty('position', 'relative', 'important')
            var obj = (el._dRTrigger = document.createElement('object'))
            obj.setAttribute(
                'style',
                'display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; height: 100% !important; width: 100% !important; overflow: hidden !important; pointer-events: none !important; z-index: -1 !important; opacity: 0 !important;'
            )
            obj.setAttribute('class', 'resize-sensor')
            obj.setAttribute('tabindex', '-1')

            obj._dRElement = el
            obj.onload = function() {
                this.contentDocument.defaultView._dRTrigger = this._dRElement
                this.contentDocument.defaultView.addEventListener('resize', resizeListener)
            }
            obj.type = 'text/html'
            isIE && el.appendChild(obj)
            obj.data = 'about:blank'
            !isIE && el.appendChild(obj)
        }
    }
    el._dRListeners.push(fn)
}

function resizeUnlisten(el, fn) {
    el._dRListeners = fn
        ? el._dRListeners.filter(function(f) {
              return f != fn
          })
        : []
    if (!el._dRListeners.length) {
        if (document.attachEvent) {
            el.detachEvent('onresize', resizeListener)
        } else {
            el._dRTrigger.contentDocument.defaultView.removeEventListener('resize', resizeListener)
            delete el._dRTrigger.contentDocument.defaultView._dRTrigger
            el._dRTrigger = !el.removeChild(el._dRTrigger)
        }
        delete el._dRListeners
    }
}

exports.resizeListen = typeof window === 'undefined' ? listen : listen.bind(window)
exports.resizeUnlisten = resizeUnlisten
