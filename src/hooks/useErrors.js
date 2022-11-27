import { useEffect, useState } from "react"

export default function useError(validations) {
  const [error, setError] = useState('')
  useEffect(() => {
    for(const validation in validations) {
      if (validations[validation]) {
        
      }
    }
  }, validations)

  return error
}