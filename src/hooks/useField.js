import { useEffect, useState } from 'react'

import useValidation from './useValidation'

export default function useField(initialValue, validations) {
  const [value, setValue] = useState(initialValue)
  const [isOut, setOut] = useState(false)
  const valid = useValidation(value, validations)


  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = (e) => {
    setOut(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isOut,
    ...valid,
  }
}
