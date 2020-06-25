import { useEffect } from 'react'

interface UseScriptArgs {
  url: string
  appId: string
  autoLogAppEvents: boolean
  xfbml: boolean
  version: string
  onFbLoaded: () => void
  onDialogLoaded: () => void
}

const useScript = (args: UseScriptArgs) => {
  const {
    url,
    appId,
    autoLogAppEvents,
    xfbml,
    version,
    onFbLoaded,
    onDialogLoaded
  } = args

  const subscribeFbDialog = () => {
    const MutationObserver =
      window.MutationObserver ||
      // @ts-ignore
      window.WebKitMutationObserver ||
      // @ts-ignore
      window.MozMutationObserver
    if (MutationObserver) {
      const observer = new MutationObserver((mutations, observerSelf) => {
        mutations.forEach(mutation => {
          // @ts-ignore
          if (
            mutation.target.id === 'fb-root' &&
            mutation.addedNodes.length > 0
          ) {
            const { addedNodes } = mutation
            if (typeof addedNodes.forEach === 'function') {
              addedNodes.forEach(element => {
                // @ts-ignore
                if (
                  element &&
                  element.className &&
                  element.className.includes('fb_dialog')
                ) {
                  onDialogLoaded()
                  observerSelf.disconnect()
                }
              })
            }
          }
        })
      })
      const target = document.querySelector('body')
      const config = { childList: true, subtree: true }

      if (target) {
        // pass in the target node, as well as the observer options
        observer.observe(target, config)
      }
    }
  }

  const loadScript = (d, s, id) => {
    // @ts-ignore
    window.fbAsyncInit = () => {
      // @ts-ignore
      window.FB.init({
        appId: appId,
        autoLogAppEvents: autoLogAppEvents,
        xfbml: xfbml,
        version: version
      })
      onFbLoaded()
    }
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    const js = d.createElement(s)
    js.id = id
    js.src = url
    fjs.parentNode.insertBefore(js, fjs)
  }

  useEffect(() => {
    loadScript(document, 'script', 'facebook-jssdk')
    subscribeFbDialog()
  }, [url])
}

export default useScript
