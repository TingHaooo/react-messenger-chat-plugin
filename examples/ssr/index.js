const express = require('express')
const { createElement } = require('react')
const { renderToString } = require('react-dom/server')
const reactMessenger = require('react-messenger-chat-plugin').default

const port = 3000
const app = express()

app.get('*', (req, res) => {
  const html = renderToString(createElement(reactMessenger))

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>react-messenger-example</title>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `)
})

app.listen(port, () => console.log('Server now listening to http://localhost:3000'))
