import React from 'react'

import Portal from '../Portal'
import './Modal.css'

export default function Modal({ active, setActive, children }) {
  return (
    <Portal>
      <div
        className={active ? 'modal active' : 'modal'}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? 'modal__content active' : 'modal__content'}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}
