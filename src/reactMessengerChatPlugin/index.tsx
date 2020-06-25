import React, { memo, useEffect, useState } from 'react'

import useFbScripts from './hooks/useFbScripts'

interface InitialSetting {
  pageId: string
  version: string
  language: string
  autoLogAppEvents?: boolean
  xfbml: boolean
  appId: string
  themeColor: string
  ref?: string
  loggedInGreeting?: string
  loggedOutGreeting?: string
  greetingDialogDelay?: string
  greetingDialogDisplay?: 'show' | 'fade' | 'hide'
}

interface Props {
  initialSetting: InitialSetting
  shouldShowPlugin?: boolean
  shouldShowDialog?: boolean
  onPluginShow?: () => void
  onPluginHide?: () => void
  onPluginLoad?: () => void
  onDialogShow?: () => void
  onDialogHide?: () => void
}

const ReactMessenger = (props: Props) => {
  const {
    initialSetting,
    shouldShowPlugin = true,
    shouldShowDialog = false,
    onPluginLoad,
    onPluginHide,
    onPluginShow,
    onDialogHide,
    onDialogShow
  } = props

  const [_initialSetting] = useState(initialSetting)
  const [didManualFbParse, setDidManualFbParse] = useState(false)
  const [fbLoaded, setFbLoaded] = useState(false)

  const {
    xfbml,
    pageId,
    version,
    language,
    autoLogAppEvents,
    appId,
    themeColor,
    ref,
    loggedInGreeting,
    loggedOutGreeting,
    greetingDialogDisplay,
    greetingDialogDelay
  } = _initialSetting

  useEffect(() => {
    if (!xfbml && !didManualFbParse && fbLoaded) {
      console.log('show plugin')
      // @ts-ignore
      console.log('load fb')
      // @ts-ignore
      window.FB.XFBML.parse()
      setDidManualFbParse(true)
    }
  }, [shouldShowPlugin])

  useFbScripts({
    url: `https://connect.facebook.net/${language}/sdk/xfbml.customerchat.js`,
    appId,
    autoLogAppEvents,
    xfbml,
    version,
    onDialogLoaded: () => {
      if (shouldShowPlugin) {
        // @ts-ignore
        window.FB.CustomerChat.show()
      } else {
        // @ts-ignore
        window.FB.CustomerChat.hide()
      }
      if (shouldShowDialog) {
        // @ts-ignore
        window.FB.CustomerChat.showDialog()
      } else {
        // @ts-ignore
        window.FB.CustomerChat.hideDialog()
      }
    },
    onFbLoaded: () => {
      // @ts-ignore
      window.FB.Event.subscribe('customerchat.load', onPluginLoad)
      // @ts-ignore
      window.FB.Event.subscribe('customerchat.show', onPluginShow)
      // @ts-ignore
      window.FB.Event.subscribe('customerchat.hide', onPluginHide)
      // @ts-ignore
      window.FB.Event.subscribe('customerchat.dialogShow', onDialogShow)
      // @ts-ignore
      window.FB.Event.subscribe('customerchat.dialogHide', onDialogHide)

      setFbLoaded(true)
    }
  })

  const html = {
    __html: `
    <div class="fb-customerchat"
        attribution=setup_tool
        page_id=${pageId}
        theme_color=${themeColor}
        ${
          loggedInGreeting !== undefined
            ? `logged_in_greeting=${loggedInGreeting}`
            : ''
        }
        ${
          loggedOutGreeting !== undefined
            ? `logged_out_greeting=${loggedOutGreeting}`
            : ''
        }
        ${ref ? `ref=${ref}` : ''}
        ${
          greetingDialogDisplay !== undefined
            ? `greeting_dialog_display=${greetingDialogDisplay}`
            : ''
        }
        ${
          greetingDialogDelay !== undefined
            ? `greeting_dialog_delay=${greetingDialogDelay}`
            : ''
        }
      ></div>
    `
  }

  return <div key={new Date().getTime()} dangerouslySetInnerHTML={html}></div>
}

export default memo(ReactMessenger, (prevProps, nextProps) => {
  if (nextProps.shouldShowPlugin !== undefined) {
    if (nextProps.shouldShowPlugin) {
      // @ts-ignore
      window.FB.CustomerChat.show(false)
    } else {
      // @ts-ignore
      window.FB.CustomerChat.hide()
    }
  }

  if (nextProps.shouldShowDialog !== undefined) {
    if (nextProps.shouldShowDialog) {
      // @ts-ignore
      window.FB.CustomerChat.showDialog()
    } else {
      // @ts-ignore
      window.FB.CustomerChat.hideDialog()
    }
  }
  return false
})
