import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Every distinct cursor "personality" the site can wear.
 * Kept as a closed union so new call-sites can't typo a variant name.
 */
export type CursorVariant =
  | 'default'
  | 'button'
  | 'card'
  | 'image'
  | 'link'
  | 'drag'
  | 'view'
  | 'play'
  | 'explore'
  | 'zoom'
  | 'hidden'

interface CursorState {
  variant: CursorVariant
  label: string | null
}

interface CursorContextValue extends CursorState {
  /** Switch the cursor to a named variant, optionally with a text label. */
  setCursor: (variant: CursorVariant, label?: string) => void
  /** Return the cursor to its resting state. */
  resetCursor: () => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

const DEFAULT_STATE: CursorState = { variant: 'default', label: null }

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(DEFAULT_STATE)

  // Stable function identities so consumers can safely put these in
  // effect dependency arrays without triggering extra re-renders.
  const setCursor = useCallback((variant: CursorVariant, label?: string) => {
    setState({ variant, label: label ?? null })
  }, [])

  const resetCursor = useCallback(() => {
    setState(DEFAULT_STATE)
  }, [])

  const value = useMemo(
    () => ({ ...state, setCursor, resetCursor }),
    [state, setCursor, resetCursor],
  )

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within a CursorProvider')
  return ctx
}

/**
 * Convenience helper that spreads onto any hoverable element to
 * drive the custom cursor without each component re-implementing
 * the enter/leave wiring.
 *
 * Usage: <div {...cursorHover(setCursor, resetCursor, 'view', 'View')} />
 */
export function cursorHoverProps(
  setCursor: CursorContextValue['setCursor'],
  resetCursor: CursorContextValue['resetCursor'],
  variant: CursorVariant,
  label?: string,
) {
  return {
    onMouseEnter: () => setCursor(variant, label),
    onMouseLeave: () => resetCursor(),
  }
}
