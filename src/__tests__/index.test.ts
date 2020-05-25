import ReactMessenger from '../index'
import { render } from '@testing-library/react'

describe('Testing', () => {
  it('"Hello World!!" is appear on browser', () => {
    const ui = render(ReactMessenger())
    expect(ui.queryByText('Hello World!!')).not.toBeNull()
  })
})
