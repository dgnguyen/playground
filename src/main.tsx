import { App } from 'app'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

const rootElement = document.querySelector('[data-js="root"]')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)
root.render(
  <Router>
    <App />
  </Router>
)
