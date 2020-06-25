import React, { useState } from 'react';

import ReactMessenger from 'react-messenger-chat-plugin'

function App() {

  const [shouldShowDialog, setSouldShowDialog] = useState(false)
  const [shouldShowPlugin, setShouldShowPlugin] = useState(false)

  return (
    <div>
      <button onClick={() => setSouldShowDialog(v => !v)}>
        click me to toggle dialog
      </button>

      <button onClick={() => setShouldShowPlugin(v => !v)}>
        click me to toggle plugin
      </button>
      <ReactMessenger
        initialSetting={{
          appId: '526946474565234',
          pageId: '125837772470807',
          xfbml: false,
          language: 'zh_TW',
          version: 'v7.0',
          themeColor: '#555555',
          loggedInGreeting: 'test',
          loggedOutGreeting: 'test',
          greetingDialogDelay: '0',
          greetingDialogDisplay: 'hide',
        }}
        shouldShowDialog={shouldShowDialog}
        shouldShowPlugin={shouldShowPlugin}
        onPluginLoad={() => console.log('on loaded')}
      />
    </div>
  );
}

export default App;
