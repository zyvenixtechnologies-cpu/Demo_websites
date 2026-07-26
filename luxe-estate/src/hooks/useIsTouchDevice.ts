import { useEffect, useState } from 'react'

/** True on touch / coarse-pointer devices where a custom cursor makes no sense. */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)')
    setIsTouch(query.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isTouch
}
