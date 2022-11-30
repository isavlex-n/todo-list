import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
export default function Portal({ children }) {
  const [el] = useState(() => {
    return document.createElement('div');
  })

  useEffect(() => {
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])
  return ReactDOM.createPortal(children, el)
}
