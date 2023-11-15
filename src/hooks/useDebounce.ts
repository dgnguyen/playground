import { useEffect, useMemo, useRef } from 'react'

import debounce from 'lodash/debounce'

export function useDebounce(callback: () => void) {

  const ref = useRef(callback)

  useEffect(() => {
    ref.current = callback
  }, [callback])

  const debounceCallback = useMemo(() => {
    const func = () => {
      // ref is mutable! ref.current is a reference to the latest sendRequest
      ref.current?.()
    }
    return debounce(func, 1000)
  }, [])

  return debounceCallback
}
