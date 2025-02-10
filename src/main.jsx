import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToDoApp from './containers/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoApp />
  </StrictMode>,
)
