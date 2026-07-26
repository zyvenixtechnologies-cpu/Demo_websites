// The actual state lives in CursorContext (it needs to be shared app-wide,
// which a plain hook can't do on its own). Re-exported here too so both
// import paths mentioned in the brief resolve to the same implementation.
export { useCursor } from '@/context/CursorContext'
export type { CursorVariant } from '@/context/CursorContext'
